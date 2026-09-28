/**
 * Plain (non-React) platform detection shared by `hooks/useIsIOS.ts` (which
 * exposes it to components) and `lib/radioStore.ts` (which uses it to pick a
 * spectrum-analysis implementation — see AGENTS.md §6).
 */

/**
 * True on iOS / iPadOS. iOS WebKit returns all-zero data from
 * `AnalyserNode.getByteFrequencyData()` when tapped off a cross-origin
 * *streaming* `<audio>` element, and `HTMLMediaElement.volume` is a no-op —
 * both consumers branch on this.
 */
export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /iP(ad|hone|od)/.test(ua) ||
    // iPadOS 13+ reports as "MacIntel" but is touch-capable.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}
