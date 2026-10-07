/**
 * `[ PLAY ]` / `[ STOP ]` / `[ -/ ... ]` — the ascii transport toggle.
 *
 * The spinner only ticks while buffering, and the interval is cleared the moment
 * buffering ends, so an idle button costs nothing.
 */

import { radioStore } from "../lib/radioStore";
import { StoreElement, define } from "./StoreElement";

const SPINNER = ["|", "/", "-", "\\"];
const SPINNER_MS = 120;

export class GainPlayButton extends StoreElement {
  #button: HTMLButtonElement | null = null;
  #spinner: ReturnType<typeof setInterval> | null = null;
  #frame = 0;

  protected setup() {
    this.#button = this.querySelector("button");
    this.#button?.addEventListener("click", () => radioStore.toggle());
  }

  protected teardown() {
    this.#stopSpinner();
  }

  #stopSpinner() {
    if (this.#spinner) clearInterval(this.#spinner);
    this.#spinner = null;
  }

  protected update() {
    const btn = this.#button;
    if (!btn) return;

    const { player, nowPlaying } = this.snapshot;
    const { isPlaying, isBuffering } = player;

    if (isBuffering && !this.#spinner) {
      this.#spinner = setInterval(() => {
        this.#frame = (this.#frame + 1) % SPINNER.length;
        this.#paint();
      }, SPINNER_MS);
    } else if (!isBuffering) {
      this.#stopSpinner();
    }

    // The old RadioView gated this on `player.ready && listenUrl && isOnline`;
    // the mini player passed no `canPlay` at all, so it was never disabled there.
    const canPlay =
      player.ready &&
      Boolean(nowPlaying?.station.listenUrl) &&
      (nowPlaying?.isOnline ?? false);
    btn.disabled = !canPlay;
    btn.setAttribute("aria-pressed", String(isPlaying));
    btn.setAttribute("aria-label", isPlaying ? "Stop" : "Play");
    this.#paint();
  }

  #paint() {
    const btn = this.#button;
    if (!btn) return;
    const { isPlaying, isBuffering } = this.snapshot.player;
    const label = isBuffering
      ? `${SPINNER[this.#frame]} ...`
      : isPlaying
        ? "STOP"
        : "PLAY";
    const next = `[ ${label} ]`;
    if (btn.textContent !== next) btn.textContent = next;
  }
}

define("gain-play-button", GainPlayButton);
