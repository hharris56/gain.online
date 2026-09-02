"use client";

import { cn } from "@/helpers/cn";
import {
  CHAR_RULER,
  charRulerClassName,
  useCharCells,
} from "../hooks/useCharCells";
import { AsciiBar } from "./AsciiBar";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface TrackProgressProps {
  elapsed: number;
  duration: number;
  /** Never render fewer cells than this. */
  minCells?: number;
  className?: string;
}

/**
 * `[##########            ]` progress meter that measures its container and
 * renders as many character cells as fit, re-fitting on resize. Falls back to a
 * scanning block when the track length is unknown (live DJ).
 */
export function TrackProgress({
  elapsed,
  duration,
  minCells = 8,
  className,
}: TrackProgressProps) {
  const { containerRef, rulerRef, cells } = useCharCells({
    fallback: 24,
    min: minCells,
  });

  const hasDuration = duration > 0;
  // Reserve the two bracket cells.
  const innerCells = Math.max(2, cells - 2);

  let liveBar = "";
  if (!hasDuration) {
    const blockW = Math.min(4, innerCells);
    const span = Math.max(1, innerCells - blockW);
    const cycle = Math.floor(elapsed) % (span * 2);
    const pos = cycle < span ? cycle : span * 2 - cycle;
    liveBar = " ".repeat(pos) + "#".repeat(blockW) + " ".repeat(span - pos);
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full font-mono text-sm", className)}
    >
      <span ref={rulerRef} aria-hidden className={charRulerClassName}>
        {CHAR_RULER}
      </span>

      {hasDuration ? (
        <AsciiBar
          ratio={elapsed / duration}
          width={innerCells}
          className="block text-(--secondary-text-color)"
          fillClassName="text-(--accent-color)"
        />
      ) : (
        <div className="whitespace-pre">
          <span className="text-(--secondary-text-color)">[</span>
          <span className="text-(--accent-color)">{liveBar}</span>
          <span className="text-(--secondary-text-color)">]</span>
        </div>
      )}

      <div className="flex justify-between text-xs text-(--secondary-text-color)">
        <span>{formatTime(elapsed)}</span>
        <span>{hasDuration ? formatTime(duration) : "LIVE"}</span>
      </div>
    </div>
  );
}
