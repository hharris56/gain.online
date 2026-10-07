/**
 * `Station :: NET__WORK [Trance]            [live ●]`
 *
 * Station name, the AzuraCast playlist it's drawing from, and the feed's
 * connection state.
 */

import type { ConnectionState } from "../types";
import { StoreElement, define } from "./StoreElement";

const CONNECTION_TAG: Record<ConnectionState, string> = {
  connecting: "....",
  live: "live",
  polling: "sync",
  offline: "-off",
};

export class GainStationLine extends StoreElement {
  protected update() {
    const { nowPlaying, connectionState } = this.snapshot;

    this.setText("[data-station]", nowPlaying?.station.name || "gain radio");

    const mode = nowPlaying?.current?.playlist || "";
    const modeEl = this.$("[data-mode]");
    if (modeEl) {
      modeEl.hidden = !mode;
      if (mode) this.setText("[data-mode]", ` [${mode}]`);
    }

    this.setText("[data-conn]", CONNECTION_TAG[connectionState]);

    const live = connectionState === "live";
    const dot = this.$("[data-conn-dot]");
    if (dot) dot.hidden = !live;

    const tag = this.$("[data-conn-tag]");
    if (tag) {
      tag.classList.toggle("text-red-500", live);
      tag.classList.toggle("text-(--secondary-text-color)", !live);
    }
  }
}

define("gain-station-line", GainStationLine);
