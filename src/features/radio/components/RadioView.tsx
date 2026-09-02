"use client";

import { useNowPlaying } from "../hooks/useNowPlaying";
import { useRadioPlayer } from "../hooks/useRadioPlayer";
import { useSpectrum } from "../hooks/useSpectrum";
import type { ConnectionState } from "../types";
import { AsciiEqualizer } from "./AsciiEqualizer";
import { NowPlayingCard } from "./NowPlayingCard";
import { PlayButton } from "./PlayButton";
import { TrackProgress } from "./TrackProgress";
import { VolumeControl } from "./VolumeControl";

const CONNECTION_TAG: Record<ConnectionState, string> = {
  connecting: "....",
  live: "live",
  polling: "sync",
  offline: "-off",
};

/** Repeated-char horizontal rule, clipped to the container width. */
function Rule({ char = "=" }: { char?: string }) {
  return (
    <div
      aria-hidden
      className="overflow-hidden font-mono whitespace-pre text-(--secondary-text-color) select-none"
    >
      {char.repeat(400)}
    </div>
  );
}

/**
 * Terminal-style radio console. Composition only — all connection / audio logic
 * lives in `useNowPlaying` and `useRadioPlayer`; the children below are pure
 * presentational.
 */
export function RadioView() {
  const { nowPlaying, connectionState, isOnline, elapsed } = useNowPlaying();
  const player = useRadioPlayer();

  const bands = useSpectrum(player.readSpectrum, {
    bands: 10,
    active: player.isPlaying,
  });

  const duration = nowPlaying?.current?.duration ?? 0;
  const canPlay =
    player.ready && Boolean(nowPlaying?.station.listenUrl) && isOnline;
  const stationName = nowPlaying?.station.name || "gain radio";
  const nextSong = nowPlaying?.next;

  return (
    <section className="my-8 font-mono text-sm border-black border p-4">
      <div className="flex items-baseline justify-between whitespace-pre">
        {/* <span className="font-bold">
          GAIN AUDIO
        </span> */}
        <div className="truncate">Station :: {stationName}</div>
        <span
          className={
            connectionState == "live"
              ? "text-red-500"
              : "text-(--secondary-text-color)"
          }
        >
          [{CONNECTION_TAG[connectionState]}
          {connectionState == "live" && (
            <span className="animate-[blink_2s_step-start_infinite]"> ●</span>
          )}
          ]
        </span>
      </div>

      {/* <Rule /> */}

      <div className="space-y-3 py-3">
        <NowPlayingCard nowPlaying={nowPlaying} />
        {/* <AsciiEqualizer bands={bands} height={6} /> */}
        <TrackProgress elapsed={elapsed} duration={duration} />
      </div>

      {/* <Rule /> */}

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        <PlayButton
          isPlaying={player.isPlaying}
          isBuffering={player.isBuffering}
          disabled={!canPlay}
          onToggle={player.toggle}
        />
        <VolumeControl
          volume={player.volume}
          muted={player.muted}
          onVolumeChange={player.setVolume}
          onToggleMute={player.toggleMute}
        />
      </div>

      {/* <Rule /> */}

      <div className="space-y-1 pt-2 whitespace-pre text-(--secondary-text-color)">
        {nextSong && (
          <div className="truncate">
            {">> UP NEXT  "}
            <div className="mt-1 truncate">
              {/* <span className="text-(--secondary-text-color)">{"  track   "}</span> */}
              <span className="font-bold">{nextSong.title}</span>
            </div>
            <div className="truncate text-(--secondary-text-color)">
              {/* {"  artist  "} */}
              {nextSong.artist || "--"}
            </div>
            <div className="truncate text-(--secondary-text-color)">
              {/* {"  album   "} */}
              {nextSong.album || "--"}
            </div>
          </div>
        )}
        {player.error && (
          <div className="text-red-600">{`!! ${player.error}`}</div>
        )}
        {!isOnline && connectionState !== "connecting" && (
          <div>{"!! station offline -- stream unavailable"}</div>
        )}
      </div>
    </section>
  );
}
