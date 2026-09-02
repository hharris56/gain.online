import { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";

const SPINNER = ["|", "/", "-", "\\"];

interface PlayButtonProps {
  isPlaying: boolean;
  isBuffering: boolean;
  disabled?: boolean;
  onToggle: () => void;
  className?: string;
}

/** `[ |> PLAY ]` / `[ [] STOP ]` / `[ -/ ... ]` — an ascii toggle. */
export function PlayButton({
  isPlaying,
  isBuffering,
  disabled,
  onToggle,
  className,
}: PlayButtonProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isBuffering) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % SPINNER.length),
      120,
    );
    return () => clearInterval(id);
  }, [isBuffering]);

  const label = isBuffering
    ? `${SPINNER[frame]} ...`
    : isPlaying
      ? "[] STOP"
      : "|> PLAY";

  return (
    <button
      type="button"
      aria-label={isPlaying ? "Stop" : "Play"}
      aria-pressed={isPlaying}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "font-mono text-sm whitespace-pre text-(--primary-text-color) transition-colors",
        "hover:text-(--accent-color) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-(--primary-text-color)",
        className,
      )}
    >
      {`[ ${label.padEnd(7)} ]`}
    </button>
  );
}
