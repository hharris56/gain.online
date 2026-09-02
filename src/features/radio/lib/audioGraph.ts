/**
 * Web Audio graph for spectrum analysis. Framework-agnostic — `useRadioPlayer`
 * owns the lifecycle, the view only ever sees a `number[]` of band magnitudes.
 *
 *   MediaElementAudioSourceNode(el) -> AnalyserNode -> AudioContext.destination
 *
 * Notes:
 * - `createMediaElementSource` may only be called ONCE per element for its whole
 *   lifetime, and once called the element's audio only reaches the speakers via
 *   this graph — hence `analyser.connect(destination)`.
 * - Reading real data requires the stream response to carry
 *   `Access-Control-Allow-Origin` AND the element to have `crossOrigin` set.
 *   Otherwise `getByteFrequencyData` returns silence (all zeros) — audio still
 *   plays fine.
 *
 * `read` returns the raw magnitude spectrum on **log-spaced frequency bands**
 * (each band ≈ a constant musical interval, so bass isn't crammed into 2-3 huge
 * bins while treble gets 100 tiny ones). Per-display shaping — spectral tilt,
 * log compression, frequency-window crop — is deliberately NOT done here: the
 * analyser is shared, so that lives on the consumer (see `AsciiEqualizer`).
 */

type AudioContextCtor = typeof AudioContext;

/** Default frequency window of the spectrum `read` returns. Consumers that crop
 *  or compute per-band centre frequencies assume this range. */
export const SPECTRUM_MIN_HZ = 30;
export const SPECTRUM_MAX_HZ = 16000;

export interface SpectrumAnalyserOptions {
  /**
   * AnalyserNode internal averaging, 0..1. This is the dominant temporal
   * smoother — it dampens attack *and* release. Low = twitchy, high = fluid.
   * Default 0.35.
   */
  smoothing?: number;
  /**
   * FFT window (power of 2). Bigger = finer bins (needed for log-spaced bass
   * bands) at the cost of latency (`fftSize / sampleRate` seconds). Default 2048.
   */
  fftSize?: number;
  /** dB floor mapped to 0. Raise toward 0 to squeeze out the noise floor. Default -85. */
  minDecibels?: number;
  /** dB ceiling mapped to 1. Default -25. */
  maxDecibels?: number;
  /** Low edge of the analysed range, Hz. Default `SPECTRUM_MIN_HZ`. */
  minHz?: number;
  /** High edge of the analysed range, Hz (clamped to Nyquist). Default `SPECTRUM_MAX_HZ`. */
  maxHz?: number;
}

export interface SpectrumAnalyser {
  /** Fill `out` with normalized 0..1 magnitudes, one per element (band). */
  read(out: number[]): void;
  /** Resume the context — call from within a user gesture. */
  resume(): Promise<void>;
  destroy(): void;
}

export function createSpectrumAnalyser(
  el: HTMLAudioElement,
  options: SpectrumAnalyserOptions = {},
): SpectrumAnalyser | null {
  if (typeof window === "undefined") return null;
  const Ctor: AudioContextCtor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor })
      .webkitAudioContext;
  if (!Ctor) return null;

  const {
    smoothing = 0.35,
    fftSize = 2048,
    minDecibels = -85,
    maxDecibels = -25,
    minHz = SPECTRUM_MIN_HZ,
    maxHz = SPECTRUM_MAX_HZ,
  } = options;

  let context: AudioContext;
  let source: MediaElementAudioSourceNode;
  try {
    context = new Ctor();
    source = context.createMediaElementSource(el);
  } catch {
    return null;
  }

  const analyser = context.createAnalyser();
  analyser.fftSize = fftSize;
  analyser.smoothingTimeConstant = smoothing;
  analyser.minDecibels = minDecibels;
  analyser.maxDecibels = maxDecibels;
  source.connect(analyser);
  analyser.connect(context.destination);

  const freq = new Uint8Array(analyser.frequencyBinCount);
  const binCount = freq.length;
  const nyquist = context.sampleRate / 2;
  const binsPerHz = binCount / nyquist;

  const logLo = Math.log(Math.max(1, minHz));
  const logHi = Math.log(Math.min(maxHz, nyquist));

  return {
    read(out) {
      analyser.getByteFrequencyData(freq);
      const bands = out.length;

      for (let b = 0; b < bands; b++) {
        const loHz = Math.exp(logLo + ((logHi - logLo) * b) / bands);
        const hiHz = Math.exp(logLo + ((logHi - logLo) * (b + 1)) / bands);

        let lo = Math.floor(loHz * binsPerHz);
        let hi = Math.ceil(hiHz * binsPerHz);
        if (hi <= lo) hi = lo + 1;
        if (hi > binCount) hi = binCount;
        if (lo >= binCount) lo = binCount - 1;

        // Mean over the band — smoother distribution than a peak.
        let sum = 0;
        for (let i = lo; i < hi; i++) sum += freq[i];
        out[b] = sum / (hi - lo) / 255;
      }
    },
    resume: () => context.resume(),
    destroy() {
      try {
        source.disconnect();
        analyser.disconnect();
      } catch {
        /* nodes already torn down */
      }
      void context.close();
    },
  };
}
