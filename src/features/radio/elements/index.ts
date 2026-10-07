/**
 * Registers every radio display element. Import this once from whatever page
 * renders radio UI; the elements then wire themselves up on connect.
 *
 * Importing this does NOT start playback or open any connection — the store
 * initialises lazily on first subscribe, and the equalizer's analysis path is
 * only built once something is actually playing and on screen.
 */

import "./gain-station-line";
import "./gain-now-playing";
import "./gain-ascii-eq";
import "./gain-track-progress";
import "./gain-play-button";
import "./gain-volume";
import "./gain-up-next";
import "./gain-mini-player";
