/**
 * The art catalogue, by collection.
 *
 * NOTE: nothing imports this. It is kept deliberately.
 *
 * The gallery that consumed it was removed with /visual during the Astro port,
 * and the handful of images still shown in blog posts have their paths written
 * directly into the post templates. This list survives so the gallery rebuild
 * has its data ready — don't delete it as dead code.
 *
 * Paths are relative to public/art. The old version mixed "./cars/x.jpg" and
 * "starcharts/x.png" and interpolated them straight into a URL, which leaked a
 * literal "./" into the path; they are normalised here.
 */

export const artCollections: Record<string, string[]> = {
  "cars!": [
    "cars/911 targa.jpg",
    "cars/mr2 mk1.jpg",
    "cars/tacoma.jpg",
    "cars/mr2.jpg",
    "cars/ae86.jpg",
    "cars/f150.jpg",
    "cars/saab.jpg",
    "cars/gti.jpg",
  ],
  "cloud study one": [
    "clouds/cloud study 7.jpg",
    "clouds/cloud study 6.jpg",
    "clouds/cloud study 5.jpg",
    "clouds/cloud study 4.jpg",
    "clouds/cloud study 3.jpg",
    "clouds/cloud study 2.jpg",
    "clouds/cloud study 1.jpg",
  ],
  "star charts": [
    "starcharts/elevation.png",
    "starcharts/momentum.png",
    "starcharts/optics.png",
    "starcharts/magnetism.png",
  ],
  "accretion department": [
    "accretion/human condition.png",
    "accretion/lazarus awoke.png",
    "accretion/5 nights in the city that never sleeps.png",
    "accretion/sterile.jpg",
    "accretion/the sound of living.png",
    "accretion/future reflections.jpg",
    "accretion/when did the sky get so far away.jpg",
    "accretion/ill advised transport.jpg",
    "accretion/self portrait 1.png",
    "accretion/media life.png",
    "accretion/virtual ghost.png",
    "accretion/directory management.jpg",
    "accretion/scan away our sins.jpg",
    "accretion/leave me here.jpg",
    "accretion/sunrise.png",
    "accretion/depth and distance.jpg",
    "accretion/the places were told not to go.png",
    "accretion/i liked it better inside.jpg",
    "accretion/a chance encounter.png",
    "accretion/one for the books.jpg",
    "accretion/smoking kills.jpg",
    "accretion/its not getting any easier.jpg",
    "accretion/aerodynamic lies.jpg",
    "accretion/allstar.png",
    "accretion/take me there.jpg",
    "accretion/genesis.jpg",
  ],
};

/** Filename without directory or extension, as used for display and lookups. */
export function shortName(path: string): string {
  return (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
}

/** Look one image up by collection and short name. */
export function findArt(collection: string, name: string): string | undefined {
  return artCollections[collection]?.find((p) => shortName(p) === name);
}
