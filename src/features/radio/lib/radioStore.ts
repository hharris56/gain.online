/**
 * Global radio store — a module singleton that owns the one shared audio stream
 * for the whole site:
 *
 *   - a single <audio> element (mounted once, invisibly, by <RadioAudioMount/>
 *     in the header so it survives client-side navigation)
 *   - the equalizer analysis path (a second fetch+decode of the same stream —
 *     see spectrumSource.ts for why it isn't tapped off the <audio> element)
 *   - the AzuraCast now-playing feed (one connection, not one per display)
 *
 * Any number of display components subscribe through `useSyncExternalStore`
 * (see `useRadioPlayer` / `useNowPlaying`) and all see the same state. Nothing
 * here imports React.
 */

import {
  createNowPlayingClient,
  type NowPlayingClient,
} from "./azuracastClient";
import {
  createStreamSpectrumSource,
  type StreamSpectrumSource,
} from "./spectrumSource";
import { radioConfig } from "../config";
import type { ConnectionState, NowPlaying } from "../types";

const VOLUME_KEY = "radio:volume";
const MUTED_KEY = "radio:muted";

export interface RadioPlayerSnapshot {
  isPlaying: boolean;
  isBuffering: boolean;
  error: string | null;
  volume: number;
  muted: boolean;
  /** True once the shared <audio> element is mounted and wired. */
  ready: boolean;
}

export interface RadioSnapshot {
  player: RadioPlayerSnapshot;
  nowPlaying: NowPlaying | null;
  /** `Date.now()` of the last now-playing payload — used to project elapsed time. */
  nowPlayingUpdatedAt: number;
  connectionState: ConnectionState;
}

const SERVER_SNAPSHOT: RadioSnapshot = {
  player: {
    isPlaying: false,
    isBuffering: false,
    error: null,
    volume: 1,
    muted: false,
    ready: false,
  },
  nowPlaying: null,
  nowPlayingUpdatedAt: 0,
  connectionState: "connecting",
};

// --- module state ----------------------------------------------------------

let snapshot: RadioSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

let audioEl: HTMLAudioElement | null = null;
let npClient: NowPlayingClient | null = null;
let initialized = false;
/** URL the element is currently pointed at, so we can re-point on stream change. */
let playingUrl: string | null = null;

/**
 * The equalizer analysis path. Created lazily by `readSpectrum` only while
 * playback is active AND something is actually asking for spectrum data, and
 * torn down by a watchdog once demand stops — so the second stream download
 * only exists when an equalizer is on screen and playing.
 */
let spectrumSource: StreamSpectrumSource | null = null;
let spectrumLastReadAt = 0;
let spectrumWatchdog: ReturnType<typeof setInterval> | null = null;
const SPECTRUM_IDLE_MS = 2000;

// --- snapshot plumbing ---------------------------------------------------------

function commit(next: RadioSnapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function patchPlayer(patch: Partial<RadioPlayerSnapshot>) {
  commit({ ...snapshot, player: { ...snapshot.player, ...patch } });
}

function patchRoot(patch: Partial<RadioSnapshot>) {
  commit({ ...snapshot, ...patch });
}

// --- persistence -------------------------------------------------------------

function readNumber(key: string, fallback: number): number {
  try {
    const raw = window.localStorage.getItem(key);
    const n = raw === null ? NaN : Number(raw);
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : fallback;
  } catch {
    return fallback;
  }
}

function readBool(key: string, fallback: boolean): boolean {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : raw === "true";
  } catch {
    return fallback;
  }
}

function persist(volume: number, muted: boolean) {
  try {
    window.localStorage.setItem(VOLUME_KEY, String(volume));
    window.localStorage.setItem(MUTED_KEY, String(muted));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

// --- lifecycle -------------------------------------------------------------

/** Client-only, idempotent. Restores prefs and opens the now-playing feed once. */
function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  snapshot = {
    ...snapshot,
    player: {
      ...snapshot.player,
      volume: readNumber(VOLUME_KEY, 1),
      muted: readBool(MUTED_KEY, false),
    },
  };

  npClient = createNowPlayingClient({
    baseUrl: radioConfig.baseUrl,
    station: radioConfig.station,
  });
  npClient.onData((np) => {
    patchRoot({ nowPlaying: np, nowPlayingUpdatedAt: Date.now() });
    const url = np.station.listenUrl;
    // Stream URL changed underneath an active playback — follow it.
    if (snapshot.player.isPlaying && url && playingUrl && url !== playingUrl) {
      start(url);
    }
  });
  npClient.onStateChange((cs) => patchRoot({ connectionState: cs }));
  npClient.start();

  spectrumWatchdog = setInterval(() => {
    if (!spectrumSource) return;
    if (
      !snapshot.player.isPlaying ||
      Date.now() - spectrumLastReadAt > SPECTRUM_IDLE_MS
    ) {
      teardownSpectrumSource();
    }
  }, 1000);
}

function teardownSpectrumSource() {
  spectrumSource?.destroy();
  spectrumSource = null;
}

// --- audio element wiring (called by <RadioAudioMount/>) --------------------

function onPlaying() {
  patchPlayer({ isPlaying: true, isBuffering: false, error: null });
}
function onWaiting() {
  patchPlayer({ isBuffering: true });
}
function onPauseEvent() {
  patchPlayer({ isPlaying: false, isBuffering: false });
}
function onError() {
  // Ignore the synthetic error from deliberately clearing `src` on pause.
  if (!audioEl?.getAttribute("src")) return;
  patchPlayer({
    isPlaying: false,
    isBuffering: false,
    error: "Unable to play the stream.",
  });
}

function bindListeners(el: HTMLAudioElement) {
  el.addEventListener("playing", onPlaying);
  el.addEventListener("waiting", onWaiting);
  el.addEventListener("stalled", onWaiting);
  el.addEventListener("pause", onPauseEvent);
  el.addEventListener("error", onError);
}
function unbindListeners(el: HTMLAudioElement) {
  el.removeEventListener("playing", onPlaying);
  el.removeEventListener("waiting", onWaiting);
  el.removeEventListener("stalled", onWaiting);
  el.removeEventListener("pause", onPauseEvent);
  el.removeEventListener("error", onError);
}

function attachAudioElement(el: HTMLAudioElement) {
  ensureInitialized();
  if (audioEl === el) return;
  if (audioEl) unbindListeners(audioEl);

  audioEl = el;
  el.preload = "none";
  el.crossOrigin = "anonymous";
  el.volume = snapshot.player.volume;
  el.muted = snapshot.player.muted;
  bindListeners(el);
  patchPlayer({ ready: true });
}

function detachAudioElement(el: HTMLAudioElement) {
  if (audioEl !== el) return;
  unbindListeners(el);
  el.pause();
  el.removeAttribute("src");
  el.load();
  audioEl = null;
  playingUrl = null;
  teardownSpectrumSource();
  patchPlayer({ ready: false, isPlaying: false, isBuffering: false });
}

// --- playback controls ------------------------------------------------------

function start(url: string) {
  if (!audioEl) {
    patchPlayer({ error: "Player not ready yet." });
    return;
  }

  // The equalizer analysis path follows the stream URL. Drop any existing one;
  // `readSpectrum` rebuilds it against the new URL on demand.
  teardownSpectrumSource();

  const fresh = `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`;
  if (audioEl.src !== fresh) audioEl.src = fresh;
  playingUrl = url;
  patchPlayer({ isBuffering: true, error: null });
  audioEl.play().catch(() => {
    patchPlayer({
      isBuffering: false,
      error: "Playback was blocked. Tap play to try again.",
    });
  });
}

function play() {
  const url = snapshot.nowPlaying?.station.listenUrl;
  if (!url) {
    patchPlayer({ error: "Stream unavailable." });
    return;
  }
  start(url);
}

function pause() {
  if (!audioEl) return;
  audioEl.pause();
  // Drop the connection instead of buffering the live stream in the background.
  audioEl.removeAttribute("src");
  audioEl.load();
  playingUrl = null;
  teardownSpectrumSource();
  patchPlayer({ isPlaying: false, isBuffering: false });
}

function toggle() {
  const { isPlaying, isBuffering } = snapshot.player;
  if (isPlaying || isBuffering) pause();
  else play();
}

function setVolume(v: number) {
  const volume = Math.min(1, Math.max(0, v));
  const muted = volume > 0 ? false : snapshot.player.muted;
  if (audioEl) {
    audioEl.volume = volume;
    audioEl.muted = muted;
  }
  persist(volume, muted);
  patchPlayer({ volume, muted });
}

function toggleMute() {
  const muted = !snapshot.player.muted;
  if (audioEl) audioEl.muted = muted;
  persist(snapshot.player.volume, muted);
  patchPlayer({ muted });
}

/**
 * Fill `out` with live 0..1 spectrum magnitudes. Self-managing: spins up the
 * analysis path (a second fetch+decode of the stream) on first call while
 * playing, and the watchdog tears it down once calls stop. All-zero until the
 * decoder has enough samples.
 */
function readSpectrum(out: number[]) {
  spectrumLastReadAt = Date.now();
  if (!spectrumSource && snapshot.player.isPlaying && playingUrl) {
    spectrumSource = createStreamSpectrumSource(playingUrl);
    void spectrumSource.resume();
  }
  if (spectrumSource) spectrumSource.read(out);
  else for (let i = 0; i < out.length; i++) out[i] = 0;
}

// --- store surface for useSyncExternalStore --------------------------------

function subscribe(listener: () => void): () => void {
  ensureInitialized();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): RadioSnapshot {
  return snapshot;
}

function getServerSnapshot(): RadioSnapshot {
  return SERVER_SNAPSHOT;
}

export const radioStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  attachAudioElement,
  detachAudioElement,
  play,
  pause,
  toggle,
  setVolume,
  toggleMute,
  readSpectrum,
};
