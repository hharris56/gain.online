/**
 * Base class for the radio's display elements.
 *
 * Each element subscribes to `radioStore` independently and updates only its own
 * DOM. That is a deliberate improvement on the React version, where a single
 * `RadioView` held all the state and re-rendered its whole subtree — so a song
 * change repainted the equalizer, transport and volume too. Here a song change
 * touches the now-playing text and nothing else.
 *
 * !! Never touch the audio element or playback state from `disconnectedCallback`.
 * These elements are destroyed and recreated on EVERY client-side navigation
 * (only the <audio> node itself is persisted — see Base.astro). Calling
 * `radioStore.detachAudioElement()` here would pause, strip `src` and `load()`
 * the stream on every page change. Unsubscribing is all that's needed; the store
 * is a module singleton and outlives any view.
 */

import { radioStore } from "../lib/radioStore";

export abstract class StoreElement extends HTMLElement {
  #unsubscribe: (() => void) | null = null;

  connectedCallback() {
    this.setup();
    this.#unsubscribe = radioStore.subscribe(() => this.update());
    this.update();
  }

  disconnectedCallback() {
    this.#unsubscribe?.();
    this.#unsubscribe = null;
    this.teardown();
  }

  /** One-time wiring: event listeners, markup, observers. */
  protected setup(): void {}

  /** Release anything `setup` created. Must not touch playback. */
  protected teardown(): void {}

  /** Paint from the current store snapshot. Called on every store change. */
  protected abstract update(): void;

  /** Current snapshot, for convenience in `update`. */
  protected get snapshot() {
    return radioStore.getSnapshot();
  }

  /** Set text only when it actually changed, to avoid needless DOM churn. */
  protected setText(selector: string, value: string) {
    const el = this.querySelector(selector);
    if (el && el.textContent !== value) el.textContent = value;
  }

  protected $(selector: string): HTMLElement | null {
    return this.querySelector<HTMLElement>(selector);
  }
}

/** Define `name` once, tolerating repeat script execution across navigations. */
export function define(name: string, ctor: CustomElementConstructor) {
  if (!customElements.get(name)) customElements.define(name, ctor);
}
