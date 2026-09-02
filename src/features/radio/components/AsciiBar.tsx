import { cn } from "@/helpers/cn";

interface AsciiBarProps {
  /** 0..1 fill ratio. */
  ratio: number;
  /** Cell count between the brackets. */
  width?: number;
  filledChar?: string;
  emptyChar?: string;
  /** Wrap the bar in `[ ]`. */
  brackets?: boolean;
  className?: string;
  /** Class applied to the filled run only (e.g. accent color). */
  fillClassName?: string;
}

/**
 * Pure string renderer for a `[#######      ]` style meter. No interaction — see
 * VolumeControl for the clickable variant.
 */
export function AsciiBar({
  ratio,
  width = 24,
  filledChar = "#",
  emptyChar = " ",
  brackets = true,
  className,
  fillClassName,
}: AsciiBarProps) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(ratio) ? ratio : 0));
  const filled = Math.round(clamped * width);
  const empty = Math.max(0, width - filled);

  return (
    <span className={cn("font-mono whitespace-pre", className)}>
      {brackets && "["}
      <span className={fillClassName}>{filledChar.repeat(filled)}</span>
      {emptyChar.repeat(empty)}
      {brackets && "]"}
    </span>
  );
}
