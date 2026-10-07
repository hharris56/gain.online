/**
 * `VOL -[||||||----]+ [MUTE]` — a hand-rolled ARIA slider plus a mute toggle.
 *
 * The slider is hidden on iOS, where `HTMLMediaElement.volume` is a documented
 * no-op, so it would be dead UI. Mute does work there, so `[MUTE]` stays. The
 * old code needed a `useIsIOS` hook to avoid a hydration mismatch; here the
 * element only ever runs in the browser, so it can just ask.
 */

import { radioStore } from "../lib/radioStore";
import { isIOS } from "../lib/platform";
import { meterCells } from "../lib/asciiMeter";
import { StoreElement, define } from "./StoreElement";

const NUDGE_AMOUNT = 0.1;

export class GainVolume extends StoreElement {
  #width = 10;

  protected setup() {
    this.#width = Number(this.dataset.width ?? 10) || 10;

    const slider = this.$("[data-slider]");
    const group = this.$("[data-volume-group]");

    if (isIOS() && group) group.hidden = true;

    this.$("[data-down]")?.addEventListener("click", () =>
      this.#nudge(-NUDGE_AMOUNT),
    );
    this.$("[data-up]")?.addEventListener("click", () =>
      this.#nudge(NUDGE_AMOUNT),
    );
    this.$("[data-mute]")?.addEventListener("click", () =>
      radioStore.toggleMute(),
    );

    slider?.addEventListener("click", (e) => {
      const rect = slider.getBoundingClientRect();
      if (rect.width <= 0) return;
      radioStore.setVolume(
        ((e as MouseEvent).clientX - rect.left) / rect.width,
      );
    });

    slider?.addEventListener("keydown", (e) => {
      const key = (e as KeyboardEvent).key;
      switch (key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          this.#nudge(-NUDGE_AMOUNT);
          break;
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          this.#nudge(NUDGE_AMOUNT);
          break;
        case "Home":
          e.preventDefault();
          radioStore.setVolume(0);
          break;
        case "End":
          e.preventDefault();
          radioStore.setVolume(1);
          break;
      }
    });
  }

  #nudge(delta: number) {
    const { volume, muted } = this.snapshot.player;
    radioStore.setVolume((muted ? 0 : volume) + delta);
  }

  protected update() {
    const { volume, muted } = this.snapshot.player;
    const effective = muted ? 0 : volume;
    const { filled, empty } = meterCells(effective, this.#width);

    this.setText("[data-fill]", "|".repeat(filled));
    this.setText("[data-empty]", "-".repeat(empty));

    this.$("[data-slider]")?.setAttribute(
      "aria-valuenow",
      String(Math.round(effective * 100)),
    );

    const mute = this.$("[data-mute]");
    if (mute) {
      const label = muted ? "[ MUTED ]" : "[ MUTE ]";
      if (mute.textContent !== label) mute.textContent = label;
      mute.setAttribute("aria-pressed", String(muted));
      mute.classList.toggle("text-(--accent-color)", muted);
    }
  }
}

define("gain-volume", GainVolume);
