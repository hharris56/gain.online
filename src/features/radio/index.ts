// Displays — compose these, or build your own from the hooks below.
export { RadioView } from "./components/RadioView";
export { AsciiEqualizer } from "./components/AsciiEqualizer";
export { TrackProgress } from "./components/TrackProgress";
export { RadioControls } from "./components/RadioControls";
export { LayoutRadioControls } from "./components/LayoutRadioControls";
export { PlayButton } from "./components/PlayButton";
export { VolumeControl } from "./components/VolumeControl";
export { NowPlayingCard } from "./components/NowPlayingCard";
export { AsciiBar } from "./components/AsciiBar";

// Mount ONCE in an always-rendered spot (the header) — the shared <audio>.
export { RadioAudioMount } from "./components/RadioAudioMount";

// Hooks — all read the same global stream via `radioStore`.
export { useNowPlaying } from "./hooks/useNowPlaying";
export { useRadioPlayer } from "./hooks/useRadioPlayer";
export { useSpectrum } from "./hooks/useSpectrum";
export { useCharCells } from "./hooks/useCharCells";
export { useIsIOS } from "./hooks/useIsIOS";

// Escape hatches.
export { radioStore } from "./lib/radioStore";
export { createNowPlayingClient } from "./lib/azuracastClient";
export { SPECTRUM_MIN_HZ, SPECTRUM_MAX_HZ } from "./lib/spectrumBands";
export { radioConfig } from "./config";
export type { ConnectionState, NowPlaying, NowPlayingSong } from "./types";
