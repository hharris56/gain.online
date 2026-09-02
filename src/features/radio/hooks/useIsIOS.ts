"use client";

import { useEffect, useState } from "react";

function detect(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /iP(ad|hone|od)/.test(ua) ||
    // iPadOS 13+ reports as "MacIntel" but is touch-capable.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/**
 * True on iOS / iPadOS. Starts `false` (SSR + first paint) and updates after
 * mount, so it never causes a hydration mismatch. Used to hide the volume
 * control, since `HTMLMediaElement.volume` is a no-op on iOS.
 */
export function useIsIOS(): boolean {
  const [ios, setIos] = useState(false);
  useEffect(() => setIos(detect()), []);
  return ios;
}
