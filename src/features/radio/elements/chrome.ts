/**
 * Just the elements the site chrome needs: the mini player and its transport.
 *
 * Kept separate from `./index.ts` on purpose. Most pages only ever show the mini
 * player, and a barrel of side-effectful imports can't be tree-shaken — pulling
 * in the full console would ship the equalizer, progress bar and now-playing
 * readout to every page that will never render them.
 */

import "./gain-mini-player";
import "./gain-play-button";
import "./gain-volume";
