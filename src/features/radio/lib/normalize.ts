import type {
  NowPlaying,
  NowPlayingSong,
  RawNowPlaying,
  RawSong,
} from "../types";

function normalizeSong(raw: RawSong | undefined): NowPlayingSong {
  return {
    text: raw?.text ?? "",
    artist: raw?.artist ?? "",
    title: raw?.title ?? "",
    album: raw?.album ?? "",
    art: raw?.art ?? "",
  };
}

/**
 * Collapse an AzuraCast now-playing payload into the trimmed `NowPlaying` shape
 * the rest of the feature consumes. Tolerant of missing fields — AzuraCast omits
 * `now_playing` / `playing_next` when a station is offline or a live DJ is on.
 */
export function normalize(raw: RawNowPlaying): NowPlaying {
  return {
    station: {
      name: raw.station?.name ?? "",
      listenUrl: raw.station?.listen_url ?? "",
    },
    current: raw.now_playing
      ? {
          song: normalizeSong(raw.now_playing.song),
          duration: raw.now_playing.duration ?? 0,
          elapsed: raw.now_playing.elapsed ?? 0,
        }
      : null,
    next: raw.playing_next ? normalizeSong(raw.playing_next.song) : null,
    live: {
      isLive: raw.live?.is_live ?? false,
      streamerName: raw.live?.streamer_name ?? "",
    },
    listeners: raw.listeners?.current ?? 0,
    isOnline: raw.is_online ?? false,
  };
}
