/**
 * What's queued next, plus any playback error or offline notice.
 */

import { StoreElement, define } from "./StoreElement";

export class GainUpNext extends StoreElement {
  protected update() {
    const { nowPlaying, connectionState, player } = this.snapshot;
    const next = nowPlaying?.next;

    const block = this.$("[data-next]");
    if (block) {
      block.hidden = !next;
      if (next) {
        this.setText("[data-next-title]", next.title || "--");
        this.setText("[data-next-artist]", next.artist || "--");
        this.setText("[data-next-album]", next.album || "--");
      }
    }

    const err = this.$("[data-error]");
    if (err) {
      err.hidden = !player.error;
      if (player.error) this.setText("[data-error]", `!! ${player.error}`);
    }

    const offline = this.$("[data-offline]");
    if (offline) {
      const isOnline = nowPlaying?.isOnline ?? false;
      offline.hidden = isOnline || connectionState === "connecting";
    }
  }
}

define("gain-up-next", GainUpNext);
