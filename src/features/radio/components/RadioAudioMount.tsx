"use client";

import { useEffect, useRef } from "react";
import { radioStore } from "../lib/radioStore";

/**
 * The one shared, invisible <audio> element for the whole site. Mount this
 * exactly once, somewhere always-rendered (the header), so playback survives
 * client-side navigation. All control flows through `radioStore` — this
 * component only owns the DOM node.
 */
export function RadioAudioMount() {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    radioStore.attachAudioElement(el);
    return () => radioStore.detachAudioElement(el);
  }, []);

  return <audio ref={ref} hidden aria-hidden preload="none" />;
}
