import { cn } from "@/helpers/cn";

interface AsciiEqualizerProps {
  /** 0..1 magnitude per band. */
  bands: number[];
  /** Rows tall. Also the rendered height (in text lines) — never varies with signal. */
  height?: number;
  /** Ramp from empty -> full for a single cell. First char is the "silent" glyph. */
  ramp?: string;
  className?: string;
}

const DEFAULT_RAMP = " .:-=+*#%@";

/**
 * Pure vertical bar-graph in text:
 *
 *       # #
 *   #   # #  #
 *   # # # #  #
 *   # # # # ##
 *
 * Every row is emitted at full width (silent cells included) and the wrapper is
 * pinned to exactly `height` lines, so the block occupies the same box whether
 * the signal is peaking or dead silent — nothing on the page reflows.
 */
export function AsciiEqualizer({
  bands,
  height = 6,
  ramp = DEFAULT_RAMP,
  className,
}: AsciiEqualizerProps) {
  const steps = ramp.length - 1;
  const rows: string[] = [];

  for (let r = 0; r < height; r++) {
    const rowFromBottom = height - r; // top row => height, bottom row => 1
    let line = "";
    for (const raw of bands) {
      const v = Math.max(0, Math.min(1, raw));
      const cellFill = v * height - (rowFromBottom - 1); // 0..1 within this cell
      const idx = Math.max(0, Math.min(steps, Math.round(cellFill * steps)));
      line += ramp[idx] + " ";
    }
    // Drop only the trailing separator — width stays constant across rows/frames.
    rows.push(line.slice(0, -1));
  }

  return (
    <pre
      aria-hidden
      style={{ height: `${height}em`, lineHeight: 1 }}
      className={cn(
        "m-0 overflow-hidden font-mono text-sm whitespace-pre text-(--accent-color) select-none",
        className,
      )}
    >
      {rows.join("\n")}
    </pre>
  );
}
