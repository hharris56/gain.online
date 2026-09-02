import { cn } from "@/helpers/cn";
import type { NowPlaying } from "../types";

interface NowPlayingCardProps {
  nowPlaying: NowPlaying | null;
  className?: string;
}

/** Terminal-style readout of the current track. Read-only. */
export function NowPlayingCard({ nowPlaying, className }: NowPlayingCardProps) {
  const song = nowPlaying?.current?.song ?? null;
  const isLive = nowPlaying?.live.isLive ?? false;
  const title = song?.title || song?.text || "(nothing playing)";
  const artist = isLive
    ? nowPlaying?.live.streamerName || "live dj"
    : song?.artist || "";
  const album = song?.album || "";
  const listeners = nowPlaying?.listeners ?? 0;

  return (
    <div className={cn("font-mono text-sm whitespace-pre", className)}>
      <div className="flex flex-row justify-between">
        <div className="text-(--secondary-text-color)">
          {isLive ? "~ ON AIR ~" : ">> NOW PLAYING"}
        </div>
        <div className="text-(--secondary-text-color)">
          {`${listeners.toString().padStart(3, "0")}`}
          <span className="hidden xxs:inline"> listening</span>
        </div>
      </div>
      <div className="mt-1 truncate">
        {/* <span className="text-(--secondary-text-color)">{"  track   "}</span> */}
        <span className="font-bold">{title}</span>
      </div>
      <div className="truncate text-(--secondary-text-color)">
        {/* {"  artist  "} */}
        {artist || "--"}
      </div>
      <div className="truncate text-(--secondary-text-color)">
        {/* {"  album   "} */}
        {album || "--"}
      </div>
    </div>
  );
}
