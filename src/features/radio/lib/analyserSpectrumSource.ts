/**
 * Non-iOS spectrum path — taps a real `AnalyserNode` directly off the
 * actual playing `<audio>` element via Web Audio. Bars and sound are the
 * literal same buffer: zero drift, no second stream download.
 *
 * This only works because iOS WebKit is the one browser that returns
 * all-zero data from `AnalyserNode.getByteFrequencyData()` for a cross-origin
 * *streaming* media tap; everywhere else this is safe. iOS uses the
 * independent fetch+decode+FFT path in `spectrumSource.ts` instead — see
 * AGENTS.md §6.
 */

import { binsToLogBands } from "./spectrumBands";
import type { StreamSpectrumSource } from "./spectrumSource";

const FFT_SIZE = 2048;
const SMOOTHING_TIME_CONSTANT = 0.35; // matches spectrumSource.ts's SMOOTHING

/**
 * `createMediaElementSource` throws if called twice on the same element, and
 * an `AudioContext` is a limited resource — so the graph is created once per
 * element and cached for that element's lifetime, independent of how many
 * times a spectrum source is created/destroyed around it.
 */
const graphs = new WeakMap<
  HTMLAudioElement,
  { ctx: AudioContext; node: MediaElementAudioSourceNode }
>();

function getOrCreateGraph(audioEl: HTMLAudioElement) {
  let graph = graphs.get(audioEl);
  if (graph) return graph;

  const ctx = new AudioContext();
  const node = ctx.createMediaElementSource(audioEl);
  // Critical: once createMediaElementSource is called, the Web Audio graph
  // becomes the *only* audio output path for this element. Without this
  // connection to destination, playback goes silent.
  node.connect(ctx.destination);

  graph = { ctx, node };
  graphs.set(audioEl, graph);
  return graph;
}

export function createAnalyserSpectrumSource(
  audioEl: HTMLAudioElement,
): StreamSpectrumSource {
  let destroyed = false;
  let analyser: AnalyserNode | null = null;
  let bins: Uint8Array<ArrayBuffer> | null = null;

  return {
    async resume() {
      if (destroyed) return;
      const { ctx, node } = getOrCreateGraph(audioEl);
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      if (destroyed) return;
      if (!analyser) {
        analyser = ctx.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;
        bins = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
        node.connect(analyser);
      }
    },

    read(out) {
      if (destroyed || !analyser || !bins) {
        for (let i = 0; i < out.length; i++) out[i] = 0;
        return;
      }
      analyser.getByteFrequencyData(bins);
      binsToLogBands(bins, out, analyser.context.sampleRate);
    },

    destroy() {
      destroyed = true;
      // Only disconnect the analyser — the shared AudioContext and
      // MediaElementAudioSourceNode outlive this instance (see `graphs`).
      analyser?.disconnect();
      analyser = null;
      bins = null;
    },
  };
}
