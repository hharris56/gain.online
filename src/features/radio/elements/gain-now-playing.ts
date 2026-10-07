/**
 * Terminal-style readout of the current track. Read-only.
 */

import { StoreElement, define } from "./StoreElement";

export class GainNowPlaying extends StoreElement {
  protected update() {
    const { nowPlaying } = this.snapshot;
    const song = nowPlaying?.current?.song ?? null;
    const isLive = nowPlaying?.live.isLive ?? false;
    const listeners = nowPlaying?.listeners ?? 0;

    this.setText("[data-state]", isLive ? "~ ON AIR ~" : ">> NOW PLAYING");
    this.setText("[data-listeners]", listeners.toString().padStart(3, "0"));
    this.setText(
      "[data-title]",
      song?.title || song?.text || "(nothing playing)",
    );
    this.setText(
      "[data-artist]",
      (isLive ? nowPlaying?.live.streamerName || "live dj" : song?.artist) ||
        "--",
    );
    this.setText("[data-album]", song?.album || "--");
  }
}

define("gain-now-playing", GainNowPlaying);
