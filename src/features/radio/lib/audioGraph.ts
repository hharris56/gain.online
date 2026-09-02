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
 */

type AudioContextCtor = typeof AudioContext;

export interface SpectrumAnalyserOptions {
  /**
   * AnalyserNode internal averaging, 0..1. This is the dominant smoother — it
   * dampens attack *and* release. Low = twitchy/reactive, high = fluid.
   * Default 0.35.
   */
  smoothing?: number;
  /** FFT window. Smaller = lower latency, coarser bins. Default 512. */
  fftSize?: number;
  /** dB floor mapped to 0. Raise toward 0 to squeeze out the noise floor. Default -85. */
  minDecibels?: number;
  /** dB ceiling mapped to 1. Default -25. */
  maxDecibels?: number;
  /**
   * Shaping exponent applied per band (`v ** curve`). >1 exaggerates peaks and
   * suppresses low-level wash (more "pulse"); <1 lifts quiet detail. Default 1.4.
   */
  curve?: number;
}

export interface SpectrumAnalyser {
  /** Fill `out` with normalized 0..1 magnitudes, one per element (band). */
  read(out: number[]): void;
  /** Resume the context — call from within a user gesture. */
  resume(): Promise<void>;
  destroy(): void;
}

/** Fraction of FFT bins to actually use — the top end is mostly empty. */
const USABLE_FRACTION = 0.7;

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
    fftSize = 512,
    minDecibels = -85,
    maxDecibels = -25,
    curve = 1.4,
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
  const usable = Math.max(1, Math.floor(freq.length * USABLE_FRACTION));

  return {
    read(out) {
      analyser.getByteFrequencyData(freq);
      const bands = out.length;
      for (let b = 0; b < bands; b++) {
        const start = Math.floor((b / bands) * usable);
        const end = Math.max(start + 1, Math.floor(((b + 1) / bands) * usable));
        // Peak within the band reacts harder than an average.
        let peak = 0;
        for (let i = start; i < end; i++) if (freq[i] > peak) peak = freq[i];
        const v = peak / 255;
        out[b] = curve === 1 ? v : Math.pow(v, curve);
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
