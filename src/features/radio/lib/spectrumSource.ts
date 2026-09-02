/**
 * Equalizer analysis path — deliberately independent of the `<audio>` element
 * that actually plays sound.
 *
 * Why: iOS WebKit returns all-zeros from `AnalyserNode.getByteFrequencyData()`
 * when the analyser is tapped off a cross-origin *streaming* media element via
 * `createMediaElementSource()`. So instead of tapping playback, we `fetch` the
 * same stream URL a second time, decode the MP3 to PCM in a Web Worker, and run
 * our own FFT over the newest samples.
 *
 * Consequences (accepted): a second stream download while the EQ is on screen
 * and playing; ~0.5–1s drift vs. what you hear (both sit near the live edge);
 * MP3-only (a non-`audio/mpeg` response disables the path — flat bars, audio
 * untouched). Nothing here can affect playback: the two paths share only a URL.
 */

import { MPEGDecoderWebWorker } from "mpg123-decoder";
import { fft, hann } from "./fft";
import { binsToLogBands } from "./spectrumBands";

const FFT_SIZE = 2048;
const RING_SIZE = 1 << 16; // ~1.5s @ 44.1k — absorbs bursty chunk delivery
const SMOOTHING = 0.35; // matches the old AnalyserNode.smoothingTimeConstant
const MIN_DB = -85;
const MAX_DB = -25;
const RECONNECT_MS = 1000;
const MP3_CONTENT_TYPE = /mpe?g|mp3/i;
/** Samples the analysis window stays behind the write head (decode jitter margin). */
const LEAD = 3072;
/** Read-cursor gap (s) beyond which we resync to live instead of catching up. */
const MAX_DT = 0.1;

export interface StreamSpectrumSource {
  /** Fill `out` with 0..1 log-spaced band magnitudes. All-zero until primed. */
  read(out: number[]): void;
  /** Begin the fetch/decode pump. Idempotent. */
  resume(): Promise<void>;
  /** Abort the fetch and terminate the decoder worker. Not reusable after. */
  destroy(): void;
}

export function createStreamSpectrumSource(url: string): StreamSpectrumSource {
  let destroyed = false;
  let started = false;
  let disabled = false; // non-MP3 response or fatal decoder failure
  let abort: AbortController | null = null;
  let decoder: MPEGDecoderWebWorker | null = null;

  const ring = new Float32Array(RING_SIZE);
  let writePos = 0; // ring index for the next write
  let writeHead = 0; // total samples ever written (monotonic)
  let readHead = 0; // analysis-window end, in writeHead space; advanced by wall time
  let lastReadTs = 0;
  let sampleRate = 0;

  // read() scratch
  const re = new Float64Array(FFT_SIZE);
  const im = new Float64Array(FFT_SIZE);
  const win = hann(FFT_SIZE);
  const half = FFT_SIZE >> 1;
  const bins = new Uint8Array(half);
  const smooth = new Float32Array(half);

  function writeSamples(mono: Float32Array) {
    for (let i = 0; i < mono.length; i++) {
      ring[writePos] = mono[i];
      if (++writePos === RING_SIZE) writePos = 0;
      writeHead++;
    }
  }

  function toMono(channels: Float32Array[], frames: number): Float32Array {
    if (channels.length === 1) return channels[0].subarray(0, frames);
    const a = channels[0];
    const b = channels[1];
    const out = new Float32Array(frames);
    for (let i = 0; i < frames; i++) out[i] = (a[i] + b[i]) * 0.5;
    return out;
  }

  async function pump() {
    while (!destroyed && !disabled) {
      abort = new AbortController();
      try {
        const res = await fetch(url, {
          signal: abort.signal,
          cache: "no-store",
          mode: "cors",
        });
        if (!res.ok || !res.body) throw new Error(`http ${res.status}`);
        if (!MP3_CONTENT_TYPE.test(res.headers.get("content-type") || "")) {
          disabled = true;
          return;
        }
        const reader = res.body.getReader();
        while (!destroyed) {
          const { value, done } = await reader.read();
          if (done) break;
          if (!value || !decoder) continue;
          const {
            channelData,
            samplesDecoded,
            sampleRate: sr,
          } = await decoder.decode(value);
          if (destroyed) return;
          if (sr) sampleRate = sr;
          if (samplesDecoded > 0 && channelData.length > 0) {
            writeSamples(toMono(channelData, samplesDecoded));
          }
        }
      } catch {
        if (destroyed || abort?.signal.aborted) return;
      }
      if (destroyed) return;
      await new Promise((r) => setTimeout(r, RECONNECT_MS));
    }
  }

  return {
    async resume() {
      if (started || destroyed) return;
      started = true;
      try {
        decoder = new MPEGDecoderWebWorker();
        await decoder.ready;
      } catch {
        disabled = true;
        return;
      }
      if (destroyed) {
        void decoder.free();
        decoder = null;
        return;
      }
      void pump();
    },

    read(out) {
      if (disabled || sampleRate === 0 || writeHead < FFT_SIZE + LEAD) {
        for (let i = 0; i < out.length; i++) out[i] = 0;
        return;
      }

      // Advance the analysis window by real elapsed time so the spectrum moves
      // at the render rate, not at the rate network chunks happen to arrive.
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const dt = lastReadTs ? (now - lastReadTs) / 1000 : 0;
      lastReadTs = now;
      if (dt <= 0 || dt > MAX_DT) {
        readHead = writeHead - LEAD; // first call / long stall → resync to live
      } else {
        readHead += dt * sampleRate;
      }
      // Stay behind the decoder, and inside what the ring still holds.
      const maxHead = writeHead - LEAD;
      const minHead = writeHead - RING_SIZE + FFT_SIZE + 8;
      if (readHead > maxHead) readHead = maxHead;
      if (readHead < minHead) readHead = minHead;

      // Ring index of the window start (sample `end - FFT_SIZE` in writeHead space).
      const behind = writeHead - Math.floor(readHead); // >= LEAD
      let idx = writePos - behind - FFT_SIZE;
      idx = ((idx % RING_SIZE) + RING_SIZE) % RING_SIZE;
      for (let i = 0; i < FFT_SIZE; i++) {
        re[i] = ring[idx] * win[i];
        im[i] = 0;
        if (++idx === RING_SIZE) idx = 0;
      }
      fft(re, im);

      const norm = 2 / FFT_SIZE;
      for (let k = 0; k < half; k++) {
        const mag = Math.sqrt(re[k] * re[k] + im[k] * im[k]) * norm;
        const db = mag > 1e-9 ? 20 * Math.log10(mag) : MIN_DB;
        let v = (db - MIN_DB) / (MAX_DB - MIN_DB);
        if (v < 0) v = 0;
        else if (v > 1) v = 1;
        smooth[k] = SMOOTHING * smooth[k] + (1 - SMOOTHING) * v;
        bins[k] = Math.round(smooth[k] * 255);
      }
      binsToLogBands(bins, out, sampleRate);
    },

    destroy() {
      destroyed = true;
      abort?.abort();
      if (decoder) {
        void decoder.free();
        decoder = null;
      }
    },
  };
}
