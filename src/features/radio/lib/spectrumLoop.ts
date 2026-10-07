/**
 * The equalizer's animation loop: pulls spectrum magnitudes from the store,
 * applies an asymmetric attack/decay envelope, and hands the result to a
 * callback once per capped frame.
 *
 * Replaces the old `useSpectrum` hook. Two differences, both deliberate:
 *
 *  - The rAF loop is only armed while it has something to do. The hook re-armed
 *    unconditionally and kept pushing all-zero bands ~45x/s forever, even while
 *    paused and off-screen.
 *  - `onFrame` is handed the live buffer rather than a fresh copy. The hook did
 *    `setValues(out.slice())` every frame purely so React would see a new
 *    reference; callers here read it synchronously and must not retain it.
 *
 * Frequency smoothing is not done here — that lives in the AnalyserNode (or the
 * iOS decoder's per-bin smoothing). This is envelope shaping only.
 */

export interface SpectrumLoopOptions {
  /** Number of frequency bands to produce. */
  bands?: number;
  /** Repaint cap. Default 45. */
  fps?: number;
  /** Rise responsiveness, 0..1. `1` snaps instantly to a louder value. */
  attack?: number;
  /** Fall responsiveness, 0..1 per frame. Higher drops faster. */
  decay?: number;
}

export interface SpectrumLoop {
  /**
   * Turn sampling on or off. Switching off doesn't stop the loop immediately —
   * it keeps running until the bands have eased down to silence, then parks
   * itself so an idle page costs nothing.
   */
  setActive(active: boolean): void;
  /** Stop immediately and drop the frame callback. */
  destroy(): void;
}

export function createSpectrumLoop(
  read: (out: number[]) => void,
  onFrame: (bands: number[]) => void,
  { bands = 16, fps = 45, attack = 1, decay = 0.4 }: SpectrumLoopOptions = {},
): SpectrumLoop {
  const raw: number[] = new Array(bands).fill(0);
  const out: number[] = new Array(bands).fill(0);
  const frameMs = 1000 / fps;

  let raf = 0;
  let last = 0;
  let active = false;
  let destroyed = false;

  const tick = (t: number) => {
    if (destroyed) return;

    if (t - last < frameMs) {
      raf = requestAnimationFrame(tick);
      return;
    }
    last = t;

    if (active) read(raw);

    let moving = false;
    for (let i = 0; i < out.length; i++) {
      const target = active ? (raw[i] ?? 0) : 0;
      if (target >= out[i]) {
        // Rising: jump most/all of the way there.
        out[i] = out[i] + (target - out[i]) * attack;
      } else {
        // Falling: fixed per-frame drop, clamped to the target.
        out[i] = Math.max(target, out[i] - decay);
      }
      if (out[i] > 0) moving = true;
    }

    onFrame(out);

    // While inactive, keep going only until everything has decayed to zero.
    if (active || moving) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  return {
    setActive(next: boolean) {
      if (destroyed) return;
      active = next;
      if (raf === 0) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    },
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
