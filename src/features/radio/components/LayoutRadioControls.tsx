"use client";

import { useRadioPlayer } from "../hooks/useRadioPlayer";
import { RadioControls } from "./RadioControls";

/**
 * Radio transport for the site chrome — renders `RadioControls` only while the
 * stream is playing (or buffering), so it stays out of the way otherwise.
 * Drop it anywhere always-mounted, e.g. under the nav in `(main)/layout.tsx`.
 */
export function LayoutRadioControls({ className }: { className?: string }) {
  const player = useRadioPlayer();
  if (!player.isPlaying && !player.isBuffering) return null;

  return (
    <RadioControls
      className={className}
      isPlaying={player.isPlaying}
      isBuffering={player.isBuffering}
      onToggle={player.toggle}
      volume={player.volume}
      muted={player.muted}
      onVolumeChange={player.setVolume}
      onToggleMute={player.toggleMute}
    />
  );
}
