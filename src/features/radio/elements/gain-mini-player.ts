/**
 * The persistent mini transport in the site chrome. Its children (play button,
 * volume) subscribe to the store themselves, so all this has to do is show or
 * hide itself — it stays out of the way unless something is actually playing.
 *
 * Replaces the old `LayoutRadioControls`, which returned `null` for the same
 * purpose.
 */

import { StoreElement, define } from "./StoreElement";

export class GainMiniPlayer extends StoreElement {
  protected update() {
    const { isPlaying, isBuffering } = this.snapshot.player;
    this.hidden = !isPlaying && !isBuffering;
  }
}

define("gain-mini-player", GainMiniPlayer);
