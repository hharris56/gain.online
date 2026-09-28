"use client";

import { useEffect, useState } from "react";
import { isIOS as detect } from "../lib/platform";

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
