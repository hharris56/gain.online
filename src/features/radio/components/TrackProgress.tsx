"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/helpers/cn";
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
  /** Cell count used until the container has been measured. */
  fallbackCells?: number;
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
  fallbackCells = 24,
  minCells = 8,
  className,
}: TrackProgressProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLSpanElement>(null);
  const [cells, setCells] = useState(fallbackCells);

  useEffect(() => {
    const wrap = wrapRef.current;
    const ruler = rulerRef.current;
    if (!wrap || !ruler) return;

    const measure = () => {
      const charWidth = ruler.getBoundingClientRect().width / 20;
      const avail = wrap.clientWidth;
      if (charWidth > 0 && avail > 0) {
        setCells(Math.max(minCells, Math.floor(avail / charWidth)));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [minCells]);

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
      ref={wrapRef}
      className={cn("relative w-full font-mono text-sm", className)}
    >
      {/* Off-layout ruler: 20 monospace cells, measured for exact char width. */}
      <span
        ref={rulerRef}
        aria-hidden
        className="pointer-events-none absolute -z-10 whitespace-pre opacity-0 select-none"
      >
        00000000000000000000
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
