"use client";

import { useEffect, useRef, useState } from "react";

interface UseSpectrumOptions {
  /** Number of frequency bands to produce. */
  bands?: number;
  /** Run the sampling loop only while true (e.g. while playing). */
  active?: boolean;
  /** Repaint cap. Higher = snappier (and more React renders). Default 45. */
  fps?: number;
  /**
   * Rise responsiveness, 0..1. `1` = instant snap to a louder value (max
   * reactive), lower = eased attack. Default 1.
   */
  attack?: number;
  /**
   * Fall responsiveness, 0..1 per frame. Higher drops faster. Default 0.4.
   */
  decay?: number;
}

/**
 * Drives a requestAnimationFrame loop over `read` (from `useRadioPlayer`) and
 * returns a throttled `number[]` of 0..1 band magnitudes for the view to render.
 * When inactive the loop is torn down and the bands ease back to zero.
 *
 * This adds only asymmetric attack/decay envelope shaping — the real frequency
 * smoothing lives in the AnalyserNode (`SpectrumAnalyserOptions.smoothing`).
 */
export function useSpectrum(
  read: (out: number[]) => void,
  {
    bands = 16,
    active = false,
    fps = 45,
    attack = 1,
    decay = 0.4,
  }: UseSpectrumOptions = {},
): number[] {
  const [values, setValues] = useState<number[]>(() => Array(bands).fill(0));
  const rawRef = useRef<number[]>(Array(bands).fill(0));
  const outRef = useRef<number[]>(Array(bands).fill(0));

  useEffect(() => {
    if (rawRef.current.length !== bands) {
      rawRef.current = Array(bands).fill(0);
      outRef.current = Array(bands).fill(0);
      setValues(Array(bands).fill(0));
    }
  }, [bands]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const frameMs = 1000 / fps;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < frameMs) return;
      last = t;

      if (active) read(rawRef.current);
      const raw = rawRef.current;
      const out = outRef.current;
      for (let i = 0; i < out.length; i++) {
        const target = active ? (raw[i] ?? 0) : 0;
        if (target >= out[i]) {
          // Rising: jump most/all of the way there.
          out[i] = out[i] + (target - out[i]) * attack;
        } else {
          // Falling: fixed per-frame drop, clamped to the target.
          out[i] = Math.max(target, out[i] - decay);
        }
      }
      setValues(out.slice());
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [read, active, fps, attack, decay, bands]);

  return values;
}
