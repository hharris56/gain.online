/**
 * `[##########        ]` progress meter with elapsed / duration readouts.
 *
 * Measures its container so the bar fills the available width. Falls back to a
 * bouncing block when the track length is unknown (a live DJ set).
 *
 * The 1s ticker only runs while a finite-length track is playing — it exists so
 * `elapsed` re-projects between AzuraCast pushes, which only arrive on song
 * change.
 */

import { formatTime, meterCells, scanningBar } from "../lib/asciiMeter";
import { projectElapsed } from "../lib/elapsed";
import { observeCharCells } from "../lib/charCells";
import { StoreElement, define } from "./StoreElement";

const MIN_CELLS = 8;

export class GainTrackProgress extends StoreElement {
  #stopObserving: (() => void) | null = null;
  #ticker: ReturnType<typeof setInterval> | null = null;
  #cells = 24;

  protected setup() {
    const ruler = this.$("[data-ruler]");
    if (ruler) {
      this.#stopObserving = observeCharCells(
        this,
        ruler,
        (cells) => {
          this.#cells = cells;
          this.#paint();
        },
        { min: MIN_CELLS },
      );
    }
  }

  protected teardown() {
    this.#stopObserving?.();
    this.#stopObserving = null;
    this.#stopTicker();
  }

  #stopTicker() {
    if (this.#ticker) clearInterval(this.#ticker);
    this.#ticker = null;
  }

  protected update() {
    const duration = this.snapshot.nowPlaying?.current?.duration ?? 0;
    if (duration > 0 && !this.#ticker) {
      this.#ticker = setInterval(() => this.#paint(), 1000);
    } else if (duration <= 0) {
      this.#stopTicker();
    }
    this.#paint();
  }

  #paint() {
    const { nowPlaying, nowPlayingUpdatedAt } = this.snapshot;
    const duration = nowPlaying?.current?.duration ?? 0;
    const elapsed = projectElapsed(nowPlaying, nowPlayingUpdatedAt);
    const hasDuration = duration > 0;

    // Reserve the two bracket cells.
    const innerCells = Math.max(2, this.#cells - 2);

    if (hasDuration) {
      const { filled, empty } = meterCells(elapsed / duration, innerCells);
      this.setText("[data-fill]", "#".repeat(filled));
      this.setText("[data-empty]", " ".repeat(empty));
    } else {
      this.setText("[data-fill]", scanningBar(elapsed, innerCells));
      this.setText("[data-empty]", "");
    }

    this.setText("[data-elapsed]", formatTime(elapsed));
    this.setText(
      "[data-duration]",
      hasDuration ? formatTime(duration) : "LIVE",
    );
  }
}

define("gain-track-progress", GainTrackProgress);
