/**
 * The audio catalogue. Was spread across seven near-identical Next pages plus a
 * JSX list on the index; it's data, so it lives as data.
 *
 * `theme` entries are CSS custom property overrides applied per page — see
 * Base.astro for why they land on <body>.
 */

export interface AlbumLinks {
  spotify?: string;
  apple?: string;
  soundcloud?: string;
}

export interface Album {
  /** URL slug under /audio. */
  slug: string;
  title: string;
  date: string;
  cover: string;
  links: AlbumLinks;
  description: string;
  theme?: Record<string, string>;
}

/** The five albums whose pages are nothing but data. */
export const albums: Album[] = [
  {
    slug: "binarySky",
    title: "binary sky",
    date: "2 august 2024",
    cover: "/art/albums/binary sky/binary sky cover.jpg",
    links: {
      spotify:
        "https://open.spotify.com/album/0hvk7wFYTcV4DndMn79X24?si=xUuXK6gqTUCwWha905ja7g",
      apple: "https://music.apple.com/us/album/binary-sky-single/1767128385",
    },
    description:
      "sometimes diving in blind is the only way to see the other side.",
    theme: {
      "--accent-color": "#5e61ff",
      "--primary-text-color": "#ffefb0",
      "--secondary-text-color": "#5e61ff",
    },
  },
  {
    slug: "barsbuttelStep",
    title: "barsbuttel step",
    date: "2 august 2024",
    cover: "/art/albums/barsbuttel step/barsbuttel step cover.png",
    links: {
      spotify:
        "https://open.spotify.com/album/1gNbnzo50mqxwiWbDvnSyv?si=DT6z217VQpaB5Z5HnsYHwQ",
      apple:
        "https://music.apple.com/us/album/barsbuttel-step-single/1756583733",
    },
    description:
      "deep sounds from hamburg's club scene pour out into the surrounding streets.",
    theme: {
      "--primary-color": "black",
      "--accent-color": "#7823c0",
      "--primary-text-color": "#0bb774",
      "--secondary-text-color": "#f043be",
    },
  },
  {
    slug: "copenhagen",
    title: "copenhagen",
    date: "1 june 2024",
    cover: "/art/albums/copenhagen/copenhagen cover.jpg",
    links: {
      spotify:
        "https://open.spotify.com/track/1kX29xlXs2Aqi02tLduRmP?si=3e8bbb44b7a24b81",
      apple:
        "https://music.apple.com/us/album/copenhagen/1744846213?i=1744846214",
    },
    description:
      "a journey to the eastern front reveals more than you might expect.",
    theme: {
      "--primary-color": "black",
      "--accent-color": "#3875f8",
      "--primary-text-color": "#f7b140",
      "--secondary-text-color": "#f23430",
    },
  },
  {
    slug: "commuter",
    title: "commuter",
    date: "26 january 2024",
    cover: "/art/albums/commuter/commuter cover final.jpg",
    links: {
      spotify:
        "https://open.spotify.com/album/3OJlLVkQbBlBiYcizvPXWc?si=IvB-1BoUTWGEkKZq1p2vLQ",
      apple: "https://music.apple.com/us/album/commuter-ep/1746794979",
    },
    description:
      "a jazz jungle ep inspired by the sounds of the morning commute. this project came to be while searching for different sounds to use as background noise in the ep's first single 'tuned in'. i ended up finding a morning radio traffic report that fit so well with the track it sparked the idea for commuter and the rest was history. my favorite songs off the ep are 'european domestic' and 'marlboro red light'.",
    theme: { "--accent-color": "lightgrey" },
  },
  {
    slug: "jungleJungle",
    title: "jungle jungle",
    date: "19 november 2023",
    cover: "/art/albums/jungle jungle/jungle jungle cover.jpg",
    links: {
      spotify:
        "https://open.spotify.com/album/5o10I4PQsEjcVQe04l0JOn?si=dlxkk5PaTAuHDTR45ZL9Nw",
      apple: "https://music.apple.com/us/album/jungle-jungle/1747786677",
    },
    description: "celebrate the night.",
    theme: {
      "--primary-color": "black",
      "--accent-color": "#f23430",
      "--primary-text-color": "#f7b140",
      "--secondary-text-color": "#f23430",
    },
  },
];

export interface CatalogueEntry {
  cover: string;
  title: string;
  year: number;
  /** Omitted for entries with no page of their own. */
  slug?: string;
}

/**
 * The /audio index. Was two tab panels; both now render as labelled sections so
 * nothing is hidden behind JS.
 */
export const catalogue: { heading: string; items: CatalogueEntry[] }[] = [
  {
    heading: "releases",
    items: [
      {
        cover: "/art/albums/overseas/overseas cover.jpg",
        title: "overseas",
        year: 2025,
        slug: "overseas",
      },
      {
        cover: "/art/albums/binary sky/binary sky cover.jpg",
        title: "binary sky",
        year: 2024,
        slug: "binarySky",
      },
      {
        cover: "/art/albums/barsbuttel step/barsbuttel step cover.png",
        title: "barsbuttel step",
        year: 2024,
        slug: "barsbuttelStep",
      },
      {
        cover: "/art/albums/copenhagen/copenhagen cover.jpg",
        title: "copenhagen",
        year: 2024,
        slug: "copenhagen",
      },
    ],
  },
  {
    heading: "albums",
    items: [
      {
        cover: "/art/albums/deeper still/deeper still album cover.png",
        title: "deeper still",
        year: 2024,
        slug: "deeperStill",
      },
      {
        cover: "/art/albums/commuter/commuter cover final.jpg",
        title: "commuter",
        year: 2024,
        slug: "commuter",
      },
      {
        cover: "/art/albums/jungle jungle/jungle jungle cover.jpg",
        title: "jungle jungle",
        year: 2023,
        slug: "jungleJungle",
      },
      {
        cover: "/art/albums/second life/Second Life Cover.png",
        title: "second life",
        year: 2023,
      },
    ],
  },
];

/** Encode path segments so filenames with spaces work as URLs. */
export function artUrl(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/").replace(/^%2F/, "/");
}
