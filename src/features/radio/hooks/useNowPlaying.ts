"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { radioStore } from "../lib/radioStore";
import type { ConnectionState, NowPlaying } from "../types";

export interface UseNowPlayingResult {
  nowPlaying: NowPlaying | null;
  connectionState: ConnectionState;
  isOnline: boolean;
  /**
   * `current.elapsed` advanced locally by a 1s ticker so progress moves smoothly
   * between server pushes (which only arrive on song change).
   */
  elapsed: number;
}

/**
 * Read the site-wide now-playing feed. Backed by the single connection in
 * `radioStore`, so any number of displays can call this without multiplying
 * network connections.
 */
export function useNowPlaying(): UseNowPlayingResult {
  const { nowPlaying, connectionState, nowPlayingUpdatedAt } =
    useSyncExternalStore(
      radioStore.subscribe,
      radioStore.getSnapshot,
      radioStore.getServerSnapshot,
    );

  // Local ticker: re-render ~1s while a finite-length track plays so `elapsed`
  // below re-projects.
  const [, setTick] = useState(0);
  useEffect(() => {
    const duration = nowPlaying?.current?.duration ?? 0;
    if (duration <= 0) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [nowPlaying?.current?.duration, nowPlaying?.current?.song.title]);

  const duration = nowPlaying?.current?.duration ?? 0;
  const base = nowPlaying?.current?.elapsed ?? 0;
  const since = nowPlayingUpdatedAt
    ? (Date.now() - nowPlayingUpdatedAt) / 1000
    : 0;
  const projected = base + Math.max(0, since);
  const elapsed = duration > 0 ? Math.min(projected, duration) : projected;

  return {
    nowPlaying,
    connectionState,
    isOnline: nowPlaying?.isOnline ?? false,
    elapsed,
  };
}
