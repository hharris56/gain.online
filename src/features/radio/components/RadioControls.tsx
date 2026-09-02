import { cn } from "@/helpers/cn";
import { PlayButton } from "./PlayButton";
import { VolumeControl } from "./VolumeControl";

interface RadioControlsProps {
  isPlaying: boolean;
  isBuffering: boolean;
  /** False disables the play button (no stream / offline / not ready). */
  canPlay?: boolean;
  onToggle: () => void;
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  className?: string;
}

/**
 * Transport row: play/stop + volume. Pure presentational — wire it straight to
 * `useRadioPlayer()` fields. Combines `PlayButton` and `VolumeControl` so
 * displays only place one element.
 */
export function RadioControls({
  isPlaying,
  isBuffering,
  canPlay = true,
  onToggle,
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  className,
}: RadioControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
        className,
      )}
    >
      <PlayButton
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        disabled={!canPlay}
        onToggle={onToggle}
      />
      <VolumeControl
        volume={volume}
        muted={muted}
        onVolumeChange={onVolumeChange}
        onToggleMute={onToggleMute}
      />
    </div>
  );
}
