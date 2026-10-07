/**
 * The ASCII equalizer's maths, with no rendering attached — extracted from the
 * old React `AsciiEqualizer` component so the same shaping can drive any view.
 *
 * Pipeline: spectral tilt -> log compression -> resample to the column count ->
 * one string per row.
 */

import { SPECTRUM_MAX_HZ, SPECTRUM_MIN_HZ } from "./spectrumBands";

export const DEFAULT_RAMP = " .:-=+*#%@";

// Fixed shaping constants — toggled as a group by the options below.
const TILT_EXP = 0.2;
const TILT_PIVOT_HZ = 900;
const COMPRESSION_K = 5;

/** Log position (0..1) of `hz` within `[lo, hi]`. */
function logT(hz: number, lo: number, hi: number): number {
  return (Math.log(hz) - Math.log(lo)) / (Math.log(hi) - Math.log(lo));
}

/** Spectral tilt on log-spaced `bands` covering `[loHz, hiHz]`. */
function applyTilt(bands: number[], loHz: number, hiHz: number): number[] {
  const n = bands.length;
  if (n === 0) return bands;
  const logLo = Math.log(loHz);
  const logSpan = Math.log(hiHz) - logLo;
  return bands.map((v, i) => {
    const centerHz = Math.exp(logLo + (logSpan * (i + 0.5)) / n);
    const out = v * Math.pow(centerHz / TILT_PIVOT_HZ, TILT_EXP);
    return out > 1 ? 1 : out < 0 ? 0 : out;
  });
}

/** Log compression — large values become less differentiated than small ones. */
function applyCompression(bands: number[]): number[] {
  const div = Math.log1p(COMPRESSION_K);
  return bands.map((v) => Math.log1p(COMPRESSION_K * Math.max(0, v)) / div);
}

/** Averaging resample of `src` to `target` values, proportional to index. */
function resample(src: number[], target: number): number[] {
  const out = new Array<number>(target).fill(0);
  if (src.length === 0 || target === 0) return out;
  for (let i = 0; i < target; i++) {
    const start = Math.floor((i / target) * src.length);
    const end = Math.max(
      start + 1,
      Math.floor(((i + 1) / target) * src.length),
    );
    let sum = 0;
    let n = 0;
    for (let k = start; k < end && k < src.length; k++) {
      sum += src[k];
      n++;
    }
    out[i] = n > 0 ? sum / n : 0;
  }
  return out;
}

/**
 * Re-bucket log-spaced `src` (covering `[loHz, hiHz]`) onto `target` columns
 * spaced by *linear* frequency — bass ends up compressed into the left few
 * columns, treble spread across the rest.
 */
function resampleLinearFreq(
  src: number[],
  loHz: number,
  hiHz: number,
  target: number,
): number[] {
  const out = new Array<number>(target).fill(0);
  const n = src.length;
  if (n === 0 || target === 0) return out;
  for (let j = 0; j < target; j++) {
    const hz0 = loHz + ((hiHz - loHz) * j) / target;
    const hz1 = loHz + ((hiHz - loHz) * (j + 1)) / target;
    let a = Math.floor(logT(hz0, loHz, hiHz) * n);
    let b = Math.max(a + 1, Math.ceil(logT(hz1, loHz, hiHz) * n));
    if (a < 0) a = 0;
    if (b > n) b = n;
    let sum = 0;
    let c = 0;
    for (let k = a; k < b; k++) {
      sum += src[k];
      c++;
    }
    out[j] = c > 0 ? sum / c : 0;
  }
  return out;
}

export interface EqualizerRowOptions {
  /** Rows tall. Also the rendered height in text lines — never varies with signal. */
  height?: number;
  /** Blank cells between columns. 0 packs them solid. */
  gap?: number;
  /** Ramp from empty -> full for a single cell. First char is the "silent" glyph. */
  ramp?: string;
  /** How many columns to render. Usually derived from the measured cell width. */
  columns?: number;
  /** Columns spaced by log frequency (bass gets equal visual width). */
  logBands?: boolean;
  /** Lift highs relative to lows, countering music's bass-heavy slope. */
  spectralTilt?: boolean;
  /** Compress loud values so the bars even out. */
  logCompression?: boolean;
}

/**
 * Build the equalizer as one string per row, top row first.
 *
 *       # #
 *   #   # #  #
 *   # # # #  #
 *   # # # # ##
 *
 * Every row is emitted at full width, silent cells included, so the block is a
 * fixed `height` lines and never reflows the page when the signal goes quiet.
 */
export function buildEqualizerRows(
  bands: number[],
  {
    height = 6,
    gap = 1,
    ramp = DEFAULT_RAMP,
    columns = 24,
    logBands = false,
    spectralTilt = false,
    logCompression = false,
  }: EqualizerRowOptions = {},
): string[] {
  let src = bands;
  if (spectralTilt) src = applyTilt(src, SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ);
  if (logCompression) src = applyCompression(src);

  const cols = Math.max(1, columns);
  const values = logBands
    ? resample(src, cols)
    : resampleLinearFreq(src, SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ, cols);

  const steps = ramp.length - 1;
  const sep = " ".repeat(gap);

  const rows: string[] = [];
  for (let r = 0; r < height; r++) {
    const rowFromBottom = height - r; // top row => height, bottom row => 1
    let line = "";
    for (const raw of values) {
      const v = Math.max(0, Math.min(1, raw));
      const cellFill = v * height - (rowFromBottom - 1); // 0..1 within this cell
      const idx = Math.max(0, Math.min(steps, Math.round(cellFill * steps)));
      line += ramp[idx] + sep;
    }
    rows.push(gap > 0 ? line.slice(0, -gap) : line);
  }
  return rows;
}

/** Columns that fit in `cells` character cells at the given gap. */
export function columnsForCells(cells: number, gap: number): number {
  return Math.max(1, Math.floor(cells / (gap + 1)));
}
