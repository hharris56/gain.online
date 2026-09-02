import { cn } from "@/helpers/cn";

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  width?: number;
  className?: string;
}

/**
 * `VOL -[||||||------]+ 060%  [MUTE]` — the bar is an ARIA slider (click to seek,
 * arrow keys to nudge); `-` / `+` step by 5%.
 */
export function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  width = 10,
  className,
}: VolumeControlProps) {
  const effective = muted ? 0 : volume;
  const pct = Math.round(effective * 100);
  const filled = Math.round(effective * width);

  const nudge = (delta: number) => onVolumeChange(effective + delta);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        nudge(-0.05);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        nudge(0.05);
        break;
      case "Home":
        e.preventDefault();
        onVolumeChange(0);
        break;
      case "End":
        e.preventDefault();
        onVolumeChange(1);
        break;
    }
  };

  const onBarClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onVolumeChange(ratio);
  };

  return (
    <>
      {/* volume button */}
      <div>
        <span className="hidden xxs:inline">VOL </span>
        <button
          type="button"
          aria-label="Decrease volume"
          onClick={() => nudge(-0.05)}
          className="transition-colors hover:text-(--accent-color) cursor-pointer"
        >
          -
        </button>
        <span
          role="slider"
          tabIndex={0}
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          onKeyDown={onKeyDown}
          onClick={onBarClick}
          className="cursor-pointer rounded-xs outline-offset-2 focus-visible:outline focus-visible:outline-(--accent-color)"
        >
          [<span className="text-(--accent-color)">{"|".repeat(filled)}</span>
          {"-".repeat(Math.max(0, width - filled))}]
        </span>
        <button
          type="button"
          aria-label="Increase volume"
          onClick={() => nudge(0.05)}
          className="transition-colors hover:text-(--accent-color) cursor-pointer"
        >
          +
        </button>
      </div>
      {/* <span>{` ${pct.toString().padStart(3, "0")}%  `}</span> */}
      <button
        type="button"
        aria-pressed={muted}
        onClick={onToggleMute}
        className={cn(
          "transition-colors hover:text-(--accent-color) cursor-pointer",
          muted && "text-(--accent-color)",
        )}
      >
        {muted ? "[ MUTED ]" : "[ MUTE ]"}
      </button>
    </>
  );
}
