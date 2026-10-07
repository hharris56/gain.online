/**
 * The ASCII spectrum analyser. Measures its own width, renders as many columns
 * as fit, and repaints from a capped rAF loop while audio is playing.
 *
 * The whole render is a single `textContent` assignment on an inner <span> —
 * which is what React's commit boiled down to anyway, minus the reconciliation.
 * It has to be an inner span rather than the <pre> itself: the measuring ruler
 * also lives in there, and assigning textContent to a shared parent would delete
 * it on the first frame, leaving resizes unable to re-measure.
 */

import { radioStore } from "../lib/radioStore";
import {
  buildEqualizerRows,
  columnsForCells,
  type EqualizerRowOptions,
} from "../lib/asciiEqualizer";
import { CHAR_RULER, observeCharCells } from "../lib/charCells";
import { createSpectrumLoop, type SpectrumLoop } from "../lib/spectrumLoop";
import { StoreElement, define } from "./StoreElement";

const BANDS = 64;

export class GainAsciiEq extends StoreElement {
  #rows: HTMLElement | null = null;
  #loop: SpectrumLoop | null = null;
  #stopObserving: (() => void) | null = null;
  #cells = 24;
  #opts: EqualizerRowOptions = {};
  #gap = 1;

  protected setup() {
    this.#rows = this.$("[data-rows]");
    const container = this.$("[data-container]");
    const ruler = this.$("[data-ruler]");

    const height = Number(this.dataset.height ?? 6) || 6;
    this.#gap = Number(this.dataset.gap ?? 1) || 0;
    this.#opts = {
      height,
      gap: this.#gap,
      // The old RadioView passed all three shaping toggles explicitly.
      logBands: true,
      logCompression: true,
      spectralTilt: true,
    };

    if (container && ruler) {
      this.#stopObserving = observeCharCells(
        container,
        ruler,
        (cells) => {
          this.#cells = cells;
        },
        { min: this.#gap + 1 },
      );
    }

    this.#loop = createSpectrumLoop(
      radioStore.readSpectrum,
      (bands) => this.#paint(bands),
      { bands: BANDS },
    );
  }

  protected teardown() {
    this.#loop?.destroy();
    this.#loop = null;
    this.#stopObserving?.();
    this.#stopObserving = null;
  }

  /** Only the play state matters here; the bands come from the loop. */
  protected update() {
    this.#loop?.setActive(this.snapshot.player.isPlaying);
  }

  #paint(bands: number[]) {
    if (!this.#rows) return;
    const rows = buildEqualizerRows(bands, {
      ...this.#opts,
      columns: columnsForCells(this.#cells, this.#gap),
    });
    this.#rows.textContent = rows.join("\n");
  }
}

define("gain-ascii-eq", GainAsciiEq);
export { CHAR_RULER };
