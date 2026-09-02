"use client";

import { useSyncExternalStore } from "react";
import { radioStore } from "../lib/radioStore";

export interface UseRadioPlayerResult {
  isPlaying: boolean;
  isBuffering: boolean;
  error: string | null;
  volume: number;
  muted: boolean;
  /** The shared <audio> element is mounted and wired. */
  ready: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  /**
   * Fill `out` with live 0..1 spectrum magnitudes (one per element). No-op until
   * playback has started, or if the Web Audio tap could not be established.
   * Stable identity — safe to pass to effects.
   */
  readSpectrum: (out: number[]) => void;
}

const ACTIONS = {
  play: radioStore.play,
  pause: radioStore.pause,
  toggle: radioStore.toggle,
  setVolume: radioStore.setVolume,
  toggleMute: radioStore.toggleMute,
  readSpectrum: radioStore.readSpectrum,
};

/**
 * Read + control the site-wide radio stream. Takes no arguments — the stream
 * URL, audio element and playback state all live in `radioStore`, shared by
 * every display that calls this hook.
 */
export function useRadioPlayer(): UseRadioPlayerResult {
  const snap = useSyncExternalStore(
    radioStore.subscribe,
    radioStore.getSnapshot,
    radioStore.getServerSnapshot,
  );
  return { ...snap.player, ...ACTIONS };
}
