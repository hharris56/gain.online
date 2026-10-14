/**
 * Reveals blog posts five at a time, growing the container as it goes.
 *
 * Every post is already in the HTML — this only unhides them, so "load more"
 * costs no network and works the instant the page paints. The container is
 * animated from its current height to its new one, which is what the old
 * `scrollHeight` measure-and-transition effect did.
 *
 * Without JS, the first batch is visible and the rest stay hidden; the button
 * hides itself since it would do nothing.
 */

const STEP = 5;

class GainPosts extends HTMLElement {
  #shown = STEP;

  connectedCallback() {
    const posts = this.#posts();
    this.#shown = Number(this.dataset.initial ?? STEP) || STEP;

    const more = this.querySelector<HTMLElement>("[data-more]");
    if (more) {
      more.hidden = false;
      more.addEventListener("click", () => this.#reveal());
    }
    this.#sync(posts);
  }

  #posts() {
    return Array.from(this.querySelectorAll<HTMLElement>("[data-post]"));
  }

  #reveal() {
    const posts = this.#posts();
    this.#shown = Math.min(this.#shown + STEP, posts.length);

    const box = this.querySelector<HTMLElement>("[data-list]");
    if (!box) {
      this.#sync(posts);
      return;
    }

    // Animate from the height we have to the height we'll need. Measuring both
    // ends means the transition runs on a concrete value rather than `auto`.
    const from = box.getBoundingClientRect().height;
    this.#sync(posts);
    const to = box.scrollHeight;

    box.style.height = `${from}px`;
    requestAnimationFrame(() => {
      box.style.height = `${to}px`;
    });

    const done = () => {
      // Hand control back to the document once the growth has finished, so
      // later reflows (images loading, a resize) aren't pinned to a stale px.
      box.style.height = "";
      box.removeEventListener("transitionend", done);
    };
    box.addEventListener("transitionend", done);
  }

  #sync(posts: HTMLElement[]) {
    posts.forEach((p, i) => {
      p.hidden = i >= this.#shown;
    });
    const more = this.querySelector<HTMLElement>("[data-more]");
    if (more) more.hidden = this.#shown >= posts.length;
  }
}

if (!customElements.get("gain-posts"))
  customElements.define("gain-posts", GainPosts);
