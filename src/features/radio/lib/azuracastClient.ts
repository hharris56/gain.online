import { normalize } from "./normalize";
import type { ConnectionState, NowPlaying, RawNowPlaying } from "../types";

export interface NowPlayingClientOptions {
  /** AzuraCast origin, no trailing slash. */
  baseUrl: string;
  /** Station short name / shortcode. */
  station: string;
  /** REST poll cadence once SSE has been abandoned. Default 15s. */
  pollIntervalMs?: number;
  /** How long to wait for the first SSE message before falling back. Default 8s. */
  sseTimeoutMs?: number;
}

export interface NowPlayingClient {
  /** Register a listener for now-playing updates. Returns an unsubscribe fn. */
  onData(listener: (np: NowPlaying) => void): () => void;
  /** Register a listener for connection-state changes. Returns an unsubscribe fn. */
  onStateChange(listener: (state: ConnectionState) => void): () => void;
  /** Current connection state. */
  getState(): ConnectionState;
  /** Open the connection (SSE, falling back to polling). */
  start(): void;
  /** Tear everything down. The client is not reusable after this. */
  close(): void;
}

type DataListener = (np: NowPlaying) => void;
type StateListener = (state: ConnectionState) => void;

/**
 * Framework-agnostic connection to an AzuraCast station's now-playing feed.
 *
 * Prefers the SSE endpoint (AzuraCast's recommended "high-performance updates").
 * If SSE errors or never delivers a first message, it transparently switches to
 * REST polling — callers only ever see normalized `NowPlaying` objects and a
 * coarse `ConnectionState`.
 */
export function createNowPlayingClient(
  options: NowPlayingClientOptions,
): NowPlayingClient {
  const {
    baseUrl,
    station,
    pollIntervalMs = 15_000,
    sseTimeoutMs = 8_000,
  } = options;

  const dataListeners = new Set<DataListener>();
  const stateListeners = new Set<StateListener>();

  let state: ConnectionState = "connecting";
  let closed = false;
  let source: EventSource | null = null;
  let pollTimer: ReturnType<typeof setInterval> | null = null;
  let sseFirstMessageTimer: ReturnType<typeof setTimeout> | null = null;

  function setState(next: ConnectionState) {
    if (state === next) return;
    state = next;
    stateListeners.forEach((l) => l(next));
  }

  function emit(raw: RawNowPlaying | undefined | null) {
    if (!raw) return;
    const np = normalize(raw);
    dataListeners.forEach((l) => l(np));
  }

  // --- SSE ------------------------------------------------------------------

  function handleSsePayload(data: string) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(data);
    } catch {
      return;
    }
    if (!parsed || typeof parsed !== "object") return;

    const obj = parsed as Record<string, any>;

    // Initial snapshot: { connect: { data: [ { data: { np: {...} } }, ... ] } }
    if (obj.connect?.data && Array.isArray(obj.connect.data)) {
      obj.connect.data.forEach((row: any) => emit(row?.data?.np));
      return;
    }
    // Legacy initial snapshot: { connect: { subs: { "station:x": { publications: [...] } } } }
    if (obj.connect?.subs && typeof obj.connect.subs === "object") {
      Object.values<any>(obj.connect.subs).forEach((sub) => {
        if (Array.isArray(sub?.publications)) {
          sub.publications.forEach((row: any) => emit(row?.data?.np));
        }
      });
      return;
    }
    // Ongoing update: { pub: { data: { np: {...} } } }
    if (obj.pub?.data?.np) {
      emit(obj.pub.data.np);
    }
    // Anything else (e.g. {} keep-alive pings) is ignored.
  }

  function startSse() {
    if (closed || typeof EventSource === "undefined") {
      startPolling();
      return;
    }

    const subs = { [`station:${station}`]: { recover: true } };
    const url = `${baseUrl}/api/live/nowplaying/sse?cf_connect=${encodeURIComponent(
      JSON.stringify({ subs }),
    )}`;

    try {
      source = new EventSource(url);
    } catch {
      startPolling();
      return;
    }

    // If SSE connects but never sends a usable message, fall back.
    sseFirstMessageTimer = setTimeout(() => {
      if (state === "connecting") {
        teardownSse();
        startPolling();
      }
    }, sseTimeoutMs);

    source.onmessage = (event) => {
      if (sseFirstMessageTimer) {
        clearTimeout(sseFirstMessageTimer);
        sseFirstMessageTimer = null;
      }
      setState("live");
      handleSsePayload(event.data);
    };

    source.onerror = () => {
      // EventSource auto-reconnects on transient errors; only bail out for good
      // once the connection is fully closed.
      if (source && source.readyState === EventSource.CLOSED) {
        teardownSse();
        startPolling();
      }
    };
  }

  function teardownSse() {
    if (sseFirstMessageTimer) {
      clearTimeout(sseFirstMessageTimer);
      sseFirstMessageTimer = null;
    }
    if (source) {
      source.onmessage = null;
      source.onerror = null;
      source.close();
      source = null;
    }
  }

  // --- Polling ------------------------------------------------------------------

  async function poll() {
    try {
      const res = await fetch(`${baseUrl}/api/nowplaying/${station}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = (await res.json()) as RawNowPlaying;
      setState("polling");
      emit(raw);
    } catch {
      setState("offline");
    }
  }

  function startPolling() {
    if (closed || pollTimer) return;
    setState("polling");
    void poll();
    pollTimer = setInterval(() => void poll(), pollIntervalMs);
  }

  // --- Public API ------------------------------------------------------------------

  return {
    onData(listener) {
      dataListeners.add(listener);
      return () => dataListeners.delete(listener);
    },
    onStateChange(listener) {
      stateListeners.add(listener);
      return () => stateListeners.delete(listener);
    },
    getState() {
      return state;
    },
    start() {
      if (closed) return;
      startSse();
    },
    close() {
      closed = true;
      teardownSse();
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
      dataListeners.clear();
      stateListeners.clear();
    },
  };
}
