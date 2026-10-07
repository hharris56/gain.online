/**
 * Measuring a container's width in monospace character cells — the DOM half of
 * the old `useCharCells` hook, with no framework attached.
 *
 * The caller renders an off-layout ruler span inside the container; the ruler
 * must inherit the same font as the content being sized.
 */

/** Ruler string — its measured width / length gives one monospace cell. */
export const CHAR_RULER = "00000000000000000000";

/** Classes for the off-layout `<span>` that gets measured. */
export const CHAR_RULER_CLASS =
  "pointer-events-none absolute -z-10 whitespace-pre opacity-0 select-none";

/**
 * Watch `container` and report how many character cells fit across it, now and
 * on every resize. Returns a teardown function.
 */
export function observeCharCells(
  container: HTMLElement,
  ruler: HTMLElement,
  onChange: (cells: number) => void,
  { min = 1 }: { min?: number } = {},
): () => void {
  let last = -1;

  const measure = () => {
    const charWidth = ruler.getBoundingClientRect().width / CHAR_RULER.length;
    const avail = container.clientWidth;
    if (charWidth <= 0 || avail <= 0) return;
    const cells = Math.max(min, Math.floor(avail / charWidth));
    // Only report real changes; ResizeObserver fires for sub-cell movement too.
    if (cells !== last) {
      last = cells;
      onChange(cells);
    }
  };

  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(container);
  return () => ro.disconnect();
}
