/**
 * Shared "linear FFT bins → log-spaced bands" mapping. Both spectrum paths
 * produce a `Uint8Array` of per-bin magnitudes with `getByteFrequencyData`
 * semantics (0..255), and this collapses that to the `number[]` of 0..1
 * log-spaced band magnitudes the view renders.
 */

/** Default frequency window. Consumers that compute per-band centre
 *  frequencies (e.g. `AsciiEqualizer`'s spectral tilt) assume this range. */
export const SPECTRUM_MIN_HZ = 30;
export const SPECTRUM_MAX_HZ = 16000;

export function binsToLogBands(
  freq: Uint8Array,
  out: number[],
  sampleRate: number,
  minHz = SPECTRUM_MIN_HZ,
  maxHz = SPECTRUM_MAX_HZ,
): void {
  const bands = out.length;
  const binCount = freq.length;
  const nyquist = sampleRate / 2;
  const binsPerHz = binCount / nyquist;
  const logLo = Math.log(Math.max(1, minHz));
  const logHi = Math.log(Math.min(maxHz, nyquist));

  for (let b = 0; b < bands; b++) {
    const loHz = Math.exp(logLo + ((logHi - logLo) * b) / bands);
    const hiHz = Math.exp(logLo + ((logHi - logLo) * (b + 1)) / bands);

    let lo = Math.floor(loHz * binsPerHz);
    let hi = Math.ceil(hiHz * binsPerHz);
    if (hi <= lo) hi = lo + 1;
    if (hi > binCount) hi = binCount;
    if (lo >= binCount) lo = binCount - 1;
    if (lo < 0) lo = 0;

    let sum = 0;
    for (let i = lo; i < hi; i++) sum += freq[i];
    out[b] = sum / (hi - lo) / 255;
  }
}
