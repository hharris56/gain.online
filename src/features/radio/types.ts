/**
 * Types for the radio feature.
 *
 * `Raw*` types mirror the shape AzuraCast sends on its now-playing endpoints
 * (https://www.azuracast.com/docs/developers/now-playing-data/). Everything
 * downstream of `normalize()` uses the trimmed, camelCased `NowPlaying` shape so
 * the view never has to know about AzuraCast's payload.
 */

export type ConnectionState = "connecting" | "live" | "polling" | "offline";

export interface RawSong {
  id: string;
  text: string;
  artist: string;
  title: string;
  album: string;
  art: string;
}

export interface RawNowPlayingCurrent {
  duration: number;
  elapsed: number;
  remaining: number;
  played_at: number;
  song: RawSong;
}

export interface RawPlayingNext {
  song: RawSong;
}

export interface RawStationMount {
  url: string;
  name: string;
  bitrate: number;
  format: string;
  is_default: boolean;
}

export interface RawStation {
  name: string;
  listen_url: string;
  hls_url: string | null;
  mounts: RawStationMount[];
}

export interface RawNowPlaying {
  station: RawStation;
  listeners: { current: number; unique: number; total: number };
  live: { is_live: boolean; streamer_name: string };
  now_playing: RawNowPlayingCurrent | null;
  playing_next: RawPlayingNext | null;
  is_online: boolean;
}

export interface NowPlayingSong {
  /** "Artist - Title" fallback string from AzuraCast. */
  text: string;
  artist: string;
  title: string;
  album: string;
  /** Album art URL, or "" when none. */
  art: string;
}

export interface NowPlaying {
  station: {
    name: string;
    /** URL to feed straight into an <audio> element. */
    listenUrl: string;
  };
  current: {
    song: NowPlayingSong;
    /** Track length in seconds (0 when unknown, e.g. a live DJ). */
    duration: number;
    /** Seconds into the track at the moment this payload was produced. */
    elapsed: number;
  } | null;
  next: NowPlayingSong | null;
  live: {
    isLive: boolean;
    streamerName: string;
  };
  listeners: number;
  isOnline: boolean;
}
