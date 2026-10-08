/**
 * The release list. Was a JSX array in features/releases/releases.tsx; it's
 * data, so it lives as data now.
 *
 * `cover` paths are relative to /art and get a leading slash when rendered —
 * the old version used bare "art/albums/..." which only resolved correctly
 * because /releases has no trailing slash.
 */

export interface Release {
  title: string;
  artist: string;
  /** Spotify (or other) listen link. */
  link?: string;
  /** Path under public/art. */
  cover: string;
  description?: string;
}

export const releases: Release[] = [
  {
    title: "metrotek",
    artist: "gain online + noPress(!)",
    link: "https://open.spotify.com/track/0fVtuUzKkYeFMQnbXomUkl?si=12b6315593d44f72",
    cover: "albums/metrotek/metrotek cover.png",
    description: "trance never sounded so good",
  },
  {
    title: "it was only ever you",
    artist: "gain online",
    link: "https://open.spotify.com/track/4sCThN1UnNWsFFXsvHGYKR?si=f833a3c43a3b40a7",
    cover: "albums/it was only ever you/it was only ever you cover.png",
    description: "all i've ever wanted",
  },
  {
    title: "A1/A2",
    artist: "gain online",
    link: "https://open.spotify.com/album/7rsV9PiEv0hvu4GJlrlNts?si=3H0P7RPLT5OTOUO8jqAqyA",
    cover: "albums/51A1-A2/51A1-A2 cover.png",
    description: "choose your own adventure acid house",
  },
  {
    title: "foundation",
    artist: "gain online",
    link: "https://open.spotify.com/track/6PBcvweW5AqH62YTYQBcnV?si=5b1ac2bc9cfe4a3a",
    cover: "albums/foundation/foundation cover.jpg",
    description: "rebuilding from first principles",
  },
  {
    title: "vertigo relief",
    artist: "gain online",
    link: "https://open.spotify.com/track/7ek1wL1xtHzmqOFIoyIeVk?si=4b622cfa7c8c4795",
    cover: "albums/vertigo relief/vertigo relief cover.jpg",
    description: "a clear mind is a beautiful thing",
  },
];

/** `/art/...` URL for a cover, with path segments encoded. */
export function coverUrl(cover: string): string {
  return `/art/${cover.split("/").map(encodeURIComponent).join("/")}`;
}
