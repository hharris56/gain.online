# `features/radio` — AzuraCast stream player

> **Disclaimer.** This feature was built almost entirely by AI coding agents.
> The developer's hands-on contribution is limited to visual skinning / layout
> tweaks (mostly in `components/RadioView.tsx` and the ASCII look of the display
> components). Treat the architecture below as agent-authored: it is internally
> consistent and tested against a live station, but it has not had a deep human
> design review. When in doubt, verify against `pnpm build` and the running app.

A self-contained module that plays the developer's self-hosted AzuraCast radio
station, shows now-playing metadata, and renders a live ASCII spectrum
analyser. Everything lives under this directory; the only outside touch-points
are listed in [Integration](#integration-points-outside-this-dir).

---

## Core design decisions

### 1. One global stream, many displays

The whole point of the current shape: **a single shared audio stream that any
number of display components can render.** State does not live in a component or
a React context — it lives in a **module singleton**, `lib/radioStore.ts`.

- The store owns: the one `HTMLAudioElement` (playback), the equalizer's
  independent fetch+decode+FFT spectrum source (§6), the one AzuraCast
  now-playing connection, and playback/volume state.
- Components read it through `useSyncExternalStore` (see `hooks/`). Any display
  calling `useRadioPlayer()` / `useNowPlaying()` / `useSpectrum()` sees the same
  state; controlling playback from one updates all of them.
- There is **no `<RadioProvider>`**. A module singleton _is_ the global
  reference. The only hard requirement is that `<RadioAudioMount/>` is rendered
  exactly once somewhere always-mounted.

### 2. `<RadioAudioMount/>` — the one audio element

`components/RadioAudioMount.tsx` renders a single invisible `<audio hidden>` and
hands the DOM node to `radioStore.attachAudioElement()` on mount. It is rendered
directly in **`app/(main)/layout.tsx`** (not in the header) so it is never
unmounted while navigating between pages under `(main)` — playback continues
uninterrupted as you move around the site.

Consequence: the `(landing)` route group (`/`) uses a different layout, so there
is no player there. Move the mount to the root `app/layout.tsx` if it needs to
be truly site-wide.

**Internal navigation must use `next/link`.** A plain `<a href="/...">` triggers
a full document reload, which unmounts the whole tree — `<audio>` included — and
kills playback no matter where the mount lives. The `(main)` layout nav links
were converted to `<Link>` for exactly this reason; keep any new in-app links
that way.

### 3. The connection layer is framework-agnostic

`lib/azuracastClient.ts`, `lib/spectrumSource.ts`, `lib/fft.ts` and
`lib/spectrumBands.ts` contain **zero React**. They are plain factory functions
/ pure helpers with imperative `subscribe` / `read` / `resume` / `destroy`
APIs. The store adapts them to React; the hooks adapt the store to components;
the components are pure presentational. This layering is deliberate — keep new
code in the layer it belongs to.

### 4. Now-playing transport: SSE with polling fallback

`createNowPlayingClient` (`lib/azuracastClient.ts`):

- Opens AzuraCast's **SSE** endpoint
  (`/api/live/nowplaying/sse?cf_connect=<json>`), the recommended
  "high-performance updates" method. Parses both the initial `connect.data[]`
  snapshot and ongoing `pub.data.np` messages; ignores `{}` keep-alives.
- On SSE error or an 8s silence, tears it down and falls back to **REST
  polling** `/api/nowplaying/<station>` every 15s.
- Emits normalized `NowPlaying` objects (never raw AzuraCast shapes) and a
  coarse `ConnectionState` (`"connecting" | "live" | "polling" | "offline"`).

Docs: <https://www.azuracast.com/docs/developers/now-playing-data/>

### 5. Playback control is client-side only

AzuraCast has **no listener-side remote API**. "Play / stop" controls the local
`<audio>` element playing `station.listen_url`; "volume" is `audioEl.volume`.
That's the whole model — there is nothing server-side to call.

- Pause **drops the connection** (`removeAttribute("src")` + `load()`), it does
  not keep buffering a live stream in the background.
- Play appends a `?_=<timestamp>` cache-buster so it starts at the live edge,
  not from a stale buffer.
- `volume` / `muted` persist to `localStorage` (`radio:volume`, `radio:muted`).

### 6. Spectrum analyser — a SEPARATE fetch+decode path (not tapped off `<audio>`)

**The equalizer never touches playback.** iOS WebKit returns all-zeros from
`AnalyserNode.getByteFrequencyData()` when the analyser is tapped off a
cross-origin *streaming* `<audio>` element via `createMediaElementSource()`
(desktop works, iOS does not — even with correct CORS). And iOS makes
`HTMLMediaElement.volume` a no-op. Rather than route playback through Web Audio
(which would fix both but hands us the whole playback engine + loses free iOS
background/lock-screen playback), the EQ runs an **independent path**:

```
fetch(streamUrl)  →  mpg123-decoder (Web Worker)  →  Float32 ring buffer
  →  our own FFT (lib/fft.ts) over newest 2048 samples  →  binsToLogBands()
```

- `lib/spectrumSource.ts` — `createStreamSpectrumSource(url)` → `{ read, resume,
  destroy }`. `read()` windows (Hann) + FFTs the newest samples, maps magnitude
  → dB → `[-85,-25]` → 0..1, applies per-bin exponential smoothing (`0.35`, the
  old `smoothingTimeConstant`), then `binsToLogBands`.
- `lib/spectrumBands.ts` — `binsToLogBands(freq, out, sampleRate, minHz?,
  maxHz?)` + `SPECTRUM_MIN_HZ` / `SPECTRUM_MAX_HZ`. Shared shape so
  `AsciiEqualizer`'s tilt/compression props are unchanged.
- **`radioStore` self-manages the source's lifecycle** (do not "simplify" this):
  `readSpectrum` lazily creates it while `isPlaying && playingUrl`; a 1s
  watchdog `destroy()`s it once `!isPlaying` or no `readSpectrum` call for 2s
  (i.e. paused, or no equalizer on screen). `start()` / `pause()` /
  `detachAudioElement` also tear it down; a stream-URL change recreates it.
  Net effect: the **second stream download only exists while an equalizer is
  visible and playing**.

Gotchas — **do not "simplify" these away**:

- **MP3-only.** `read` stays flat if the fetched `Content-Type` isn't `audio/*mpeg*`.
- **No ICY metadata.** We never send `Icy-MetaData: 1`, so the response is a
  clean MP3 byte stream (interleaved metadata would break the decoder).
- **`@eshaz/web-worker` is aliased** in `next.config.js` →
  `turbopack.resolveAlias` to `lib/eshazWebWorkerShim.js`, because
  `mpg123-decoder` pulls that package's Node entry, whose dynamic `import()`
  Turbopack can't statically resolve. The shim is just `Worker` in the browser,
  a dummy `class {}` on the server (never instantiated — the path is client-only
  and lazy).
- **~0.5–1s A/V drift** between the bars and what you hear (independent fetch;
  both near the live edge). Acceptable for a visualiser.
- **Nothing here can regress playback** — the `<audio>` element and all of
  `radioStore`'s playback code are untouched; the two paths share only a URL
  string. (iOS volume buttons still no-op — separate, handled by hiding that UI
  on iOS.)

**Temporal smoothing** — two stages:

1. Per-bin exponential smoothing in `spectrumSource.ts` `read()` (constant
   `SMOOTHING = 0.35`) — the dominant smoother. If someone reports "the EQ isn't
   reactive", this is almost always why.
2. `useSpectrum`'s asymmetric envelope (default `attack: 1` instant-rise,
   `decay: 0.4`/frame fall) and a `fps` repaint cap.

**Frequency-domain shaping** is split by ownership:

- `spectrumBands.ts` `binsToLogBands()` (shared): **log-spaced bands** between
  `minHz`/`maxHz` (default `SPECTRUM_MIN_HZ`/`SPECTRUM_MAX_HZ`, exported), each ≈
  a constant musical interval, mean-aggregated. No tilt/compression here.
- `AsciiEqualizer` (per-display, since each display may want different shaping) —
  **three independent boolean toggles**, all default `true`, with fixed internal
  constants (`TILT_EXP 0.5`, `TILT_PIVOT_HZ 900`, `COMPRESSION_K 5`):
  - `logBands` — log-frequency column spacing (bass gets equal width). `false`
    re-buckets to linear frequency (`resampleLinearFreq`), bass squished left.
  - `spectralTilt` — `(centerHz / pivot) ** exp` high-lift vs. music's bass-heavy
    slope. Band centre freqs recovered from the log spacing.
  - `logCompression` — `log1p(k*v) / log1p(k)`, large values become less
    differentiated than small ones.
  - Fitting source bands to the displayed column count averages, not peaks.

Flip these off one at a time to isolate what a given look owes to.

If you build a custom display straight off `useSpectrum` you get the raw
log-spaced spectrum — replicate the shaping (`applyTilt` / `applyCompression` in
`AsciiEqualizer`) or just use `AsciiEqualizer`.

### 7. `AsciiEqualizer` fixed height

`components/AsciiEqualizer.tsx` pins its wrapper to exactly `height` text lines
(`style={{ height: '<n>em', lineHeight: 1 }}` + `overflow-hidden`) and emits
every row at full width. This is intentional: earlier it collapsed on silence
(all-zero signal, e.g. muted) and reflowed the page. Keep it height-stable.

---

## File map

| Path | Layer | Notes |
| --- | --- | --- |
| `config.ts` | config | **Only** file with station specifics: `baseUrl`, `station`. Hardcoded on purpose (matches the rest of this codebase; no env vars). |
| `types.ts` | types | `Raw*` = AzuraCast wire shapes. `NowPlaying` etc. = the trimmed shapes everything else uses. |
| `lib/normalize.ts` | connection | `RawNowPlaying` → `NowPlaying`. Tolerant of missing fields (offline / live-DJ). |
| `lib/azuracastClient.ts` | connection | SSE + polling fallback. No React. |
| `lib/spectrumSource.ts` | connection | `createStreamSpectrumSource(url)` — the EQ's independent fetch→mpg123-decode→FFT path. No React. Constants: `FFT_SIZE`, `SMOOTHING`, `MIN_DB`/`MAX_DB`. |
| `lib/fft.ts` | connection | Radix-2 FFT + Hann window. Pure, no deps. |
| `lib/spectrumBands.ts` | connection | `binsToLogBands()` + `SPECTRUM_MIN_HZ`/`SPECTRUM_MAX_HZ`. Shared by the source and `AsciiEqualizer`. |
| `lib/eshazWebWorkerShim.js` | build | Browser `Worker` stand-in, aliased in via `next.config.js` (see §6). |
| `lib/radioStore.ts` | state | The global singleton. `useSyncExternalStore` surface + imperative controls + `attach/detachAudioElement`. Self-manages the spectrum source (created on demand, torn down when idle/paused). |
| `hooks/useRadioPlayer.ts` | react bridge | **No args.** Playback state + actions + `readSpectrum`. |
| `hooks/useNowPlaying.ts` | react bridge | Shared feed + a local 1s ticker projecting `elapsed` between server pushes. |
| `hooks/useSpectrum.ts` | react bridge | Drives a rAF loop over `readSpectrum`, returns `number[]` bands. Envelope knobs: `bands`, `fps`, `attack`, `decay`. `RadioView` runs it at 64 source bands; `AsciiEqualizer` resamples down to whatever fits. |
| `hooks/useCharCells.ts` | react bridge | Measures a container's width in monospace character cells (via an off-layout ruler `<span>` + `ResizeObserver`). Used by `TrackProgress` and `AsciiEqualizer` to grow-to-fit. |
| `components/RadioAudioMount.tsx` | mount | The one `<audio>`. Render once. |
| `components/RadioView.tsx` | display | The full terminal-style console. Composition only. **Most of the dev's manual edits are here.** |
| `components/{NowPlayingCard,PlayButton,VolumeControl}.tsx` | display | Pure presentational, props + callbacks only. |
| `components/RadioControls.tsx` | display | Combines `PlayButton` + `VolumeControl` into one transport row so displays place a single element. Pure. |
| `components/LayoutRadioControls.tsx` | display | Client wrapper: reads `useRadioPlayer()` and renders `RadioControls` only while playing/buffering. Mounted under the nav in `(main)/layout.tsx`. |
| `components/TrackProgress.tsx` | display | `[####    ]` meter; grows to fill its container via `useCharCells` (client component, but still just props in). |
| `components/AsciiEqualizer.tsx` | display | Vertical bar graph; grows to fill via `useCharCells`, averaging-resamples `bands` to the fitted column count. Height pinned to `height` lines. Shaping toggles (all default on): `logBands`, `spectralTilt`, `logCompression`. |
| `components/AsciiBar.tsx` | display | Pure string renderer — `[####    ]` given `ratio` + `width`. |
| `index.ts` | barrel | Public surface. Import from `@/features/radio`. |

---

## Conventions

- Layer discipline: `lib/*` never imports React; `components/*` never imports
  from `lib/` or `hooks/` (they take props); the store is the only thing that
  bridges imperative → reactive.
- Display components are **pure**: data in via props, intent out via callbacks.
  New UI should follow this so it composes with the shared store.
- Styling: Tailwind v4 utilities + theme CSS vars (`--accent-color`,
  `--secondary-text-color`, `--shadow`), `font-mono` + `whitespace-pre` for the
  ASCII aesthetic. No slider primitive exists in the repo — `VolumeControl`
  builds an ARIA slider from text.
- 2-space indent, double quotes, semicolons, trailing commas (Prettier + Husky
  pre-commit).

## Integration points (outside this dir)

- `src/app/(main)/layout.tsx` — renders `<RadioAudioMount/>` once (so it never
  unmounts during navigation), `<LayoutRadioControls/>` under the nav (shows only
  while playing), and has the `[radio]` nav link.
- `src/app/(main)/radio/page.tsx` — the route; renders `<RadioView/>`.

## Reference material

Documentation the agents actually leaned on while building this. Re-check these
before changing the corresponding layer.

**AzuraCast**

- Now Playing Data APIs — the primary spec for this feature (SSE / WebSocket /
  polling, the `cf_connect` subscription payload, `pub.data.np` message shape):
  <https://www.azuracast.com/docs/developers/now-playing-data/>
  - Note: the docs site 403s to naive fetchers; the content was reached via a
    translate.google.com proxy. The live demo's Swagger UI is also useful:
    <https://demo.azuracast.com/docs/api/> (Now Playing → `GET /nowplaying`).
- AzuraCast API index (station/mount fields, art URLs):
  <https://www.azuracast.com/docs/developers/apis/>
- The now-playing JSON shape used here (`station.listen_url`, `station.mounts[]`,
  `now_playing.{duration,elapsed,song}`, `playing_next`, `live`, `listeners`,
  `is_online`) was confirmed against the dev's live endpoint
  `GET {baseUrl}/api/nowplaying/{station}` and encoded in `types.ts`.

**Equalizer analysis path**

- `mpg123-decoder` (streaming MPEG L-I/II/III → PCM, WASM, self-hosted Web
  Worker): <https://github.com/eshaz/wasm-audio-decoders/tree/main/src/mpg123-decoder>
- Streaming a fetch response body:
  <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams>
- Why the old `<audio>` tap failed on iOS — `createMediaElementSource()` +
  cross-origin streaming media returns silence to `AnalyserNode` on WebKit;
  `HTMLMediaElement.volume` is a no-op on iOS. Background: MDN
  `createMediaElementSource` / `HTMLMediaElement.volume` notes + WebKit bug
  history.
- Autoplay / resuming an `AudioContext` from a gesture (relevant only if the EQ
  path is ever moved back onto Web Audio):
  <https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#the_web_audio_api>

**Server-Sent Events**

- `EventSource` (connection, `onmessage`, `readyState`, auto-reconnect):
  <https://developer.mozilla.org/en-US/docs/Web/API/EventSource>

**React**

- `useSyncExternalStore` — how the module singleton (`radioStore`) is bridged
  into components, incl. the `getServerSnapshot` requirement for SSR:
  <https://react.dev/reference/react/useSyncExternalStore>

## Verifying changes

1. `config.ts` must point at a reachable AzuraCast station.
2. `pnpm dev` (port 9999), open `/radio`.
3. Now-playing card populates; DevTools Network shows an `eventsource` to
   `/api/live/nowplaying/sse`. Block that request → tag flips to `sync`
   (polling) and it still updates.
4. Play → audio starts, EQ bars move. Pause → the stream request is torn down.
5. Volume/mute persist across reload. Navigate `/radio` → `/blog` → `/radio`:
   audio keeps playing (mount is in the header).
6. `pnpm build` passes (TS strict; nothing touches `window` at module scope).
