/**
 * Project how far into the current track we are.
 *
 * AzuraCast only pushes on song change, so `current.elapsed` is a snapshot. The
 * views advance it locally from the wall clock (this was the job of the 1s
 * ticker in the old `useNowPlaying`).
 */

import type { NowPlaying } from "../types";

export function projectElapsed(
  nowPlaying: NowPlaying | null,
  nowPlayingUpdatedAt: number,
): number {
  const duration = nowPlaying?.current?.duration ?? 0;
  const base = nowPlaying?.current?.elapsed ?? 0;
  const since = nowPlayingUpdatedAt
    ? (Date.now() - nowPlayingUpdatedAt) / 1000
    : 0;
  const projected = base + Math.max(0, since);
  return duration > 0 ? Math.min(projected, duration) : projected;
}
