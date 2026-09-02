"use client";

import { cn } from "@/helpers/cn";
import { SPECTRUM_MAX_HZ, SPECTRUM_MIN_HZ } from "../lib/audioGraph";
import {
  CHAR_RULER,
  charRulerClassName,
  useCharCells,
} from "../hooks/useCharCells";

interface AsciiEqualizerProps {
  /** 0..1 magnitude per band, log-spaced over `[SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ]`. */
  bands: number[];
  /** Rows tall. Also the rendered height (in text lines) — never varies with signal. */
  height?: number;
  /** Blank cells between columns. 0 packs them solid. */
  gap?: number;
  /** Ramp from empty -> full for a single cell. First char is the "silent" glyph. */
  ramp?: string;
  /**
   * Columns spaced by log frequency (bass gets equal visual width). Set `false`
   * for linear frequency spacing (bass compressed to the left). Default `true`.
   */
  logBands?: boolean;
  /** Lift highs relative to lows, countering music's bass-heavy slope. Default `true`. */
  spectralTilt?: boolean;
  /** Compress loud values so the bars even out. Default `true`. */
  logCompression?: boolean;
  className?: string;
}

const DEFAULT_RAMP = " .:-=+*#%@";

// Fixed shaping constants — toggled as a group by the boolean props.
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

/**
 * Vertical bar-graph in text that grows to fill its container — it measures the
 * available width and renders as many columns as fit, resampling the incoming
 * `bands` to that count (re-fitting on resize).
 *
 *       # #
 *   #   # #  #
 *   # # # #  #
 *   # # # # ##
 *
 * Every row is emitted at full width (silent cells included) and the wrapper is
 * pinned to exactly `height` lines, so the block never reflows the page.
 */
export function AsciiEqualizer({
  bands,
  height = 6,
  gap = 1,
  ramp = DEFAULT_RAMP,
  logBands = false,
  spectralTilt = false,
  logCompression = false,
  className,
}: AsciiEqualizerProps) {
  const { containerRef, rulerRef, cells } = useCharCells<HTMLPreElement>({
    fallback: 24,
    min: gap + 1,
  });

  let src = bands;
  if (spectralTilt) src = applyTilt(src, SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ);
  if (logCompression) src = applyCompression(src);

  const colWidth = gap + 1;
  const columns = Math.max(1, Math.floor(cells / colWidth));
  const values = logBands
    ? resample(src, columns)
    : resampleLinearFreq(src, SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ, columns);

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
      let char = ramp[idx];
      line += char + sep;
    }
    rows.push(gap > 0 ? line.slice(0, -gap) : line);
  }

  return (
    <pre
      ref={containerRef}
      aria-hidden
      style={{ height: `${height}em`, lineHeight: 1 }}
      className={cn(
        "relative m-0 overflow-hidden font-mono text-sm whitespace-pre text-(--accent-color) select-none",
        className,
      )}
    >
      <span ref={rulerRef} aria-hidden className={charRulerClassName}>
        {CHAR_RULER}
      </span>
      {rows.join("\n")}
    </pre>
  );
}
