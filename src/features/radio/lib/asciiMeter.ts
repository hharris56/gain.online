/**
 * Small text-meter helpers shared by the progress bar and volume slider.
 */

/** Split a 0..1 ratio into filled / empty cell counts for a `[####    ]` meter. */
export function meterCells(
  ratio: number,
  width: number,
): { filled: number; empty: number } {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(ratio) ? ratio : 0));
  const filled = Math.round(clamped * width);
  return { filled, empty: Math.max(0, width - filled) };
}

/** `m:ss`, clamped at zero for junk input. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * The scanning block shown instead of a progress bar when a track's length is
 * unknown (a live DJ set has no duration). Bounces across `innerCells`.
 */
export function scanningBar(elapsed: number, innerCells: number): string {
  const blockW = Math.min(4, innerCells);
  const span = Math.max(1, innerCells - blockW);
  const cycle = Math.floor(elapsed) % (span * 2);
  const pos = cycle < span ? cycle : span * 2 - cycle;
  return " ".repeat(pos) + "#".repeat(blockW) + " ".repeat(span - pos);
}
