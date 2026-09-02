"use client";

import { useEffect, useRef, useState } from "react";

/** Ruler string — its measured width / length gives one monospace cell. */
export const CHAR_RULER = "00000000000000000000";

/** Spread onto the off-layout `<span>` that the hook measures. */
export const charRulerClassName =
  "pointer-events-none absolute -z-10 whitespace-pre opacity-0 select-none";

interface UseCharCellsOptions {
  /** Cell count returned until the container has been measured. */
  fallback?: number;
  /** Never return fewer than this. */
  min?: number;
}

/**
 * Measures a container's width in monospace character cells and keeps it current
 * on resize. Attach `containerRef` to the box to fill and render an off-layout
 * ruler inside it:
 *
 *   <div ref={containerRef} className="relative font-mono ...">
 *     <span ref={rulerRef} aria-hidden className={charRulerClassName}>{CHAR_RULER}</span>
 *     ...
 *   </div>
 *
 * The ruler must inherit the same font as the content being sized.
 */
export function useCharCells<T extends HTMLElement = HTMLDivElement>({
  fallback = 24,
  min = 1,
}: UseCharCellsOptions = {}) {
  const containerRef = useRef<T | null>(null);
  const rulerRef = useRef<HTMLSpanElement | null>(null);
  const [cells, setCells] = useState(fallback);

  useEffect(() => {
    const container = containerRef.current;
    const ruler = rulerRef.current;
    if (!container || !ruler) return;

    const measure = () => {
      const charWidth = ruler.getBoundingClientRect().width / CHAR_RULER.length;
      const avail = container.clientWidth;
      if (charWidth > 0 && avail > 0) {
        setCells(Math.max(min, Math.floor(avail / charWidth)));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [min]);

  return { containerRef, rulerRef, cells };
}
