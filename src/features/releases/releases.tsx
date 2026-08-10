import { Release } from "./Release";

export const allReleases = [
  <Release
    title="metrotek"
    artist="gain online + noPress(!)"
    link="https://open.spotify.com/track/0fVtuUzKkYeFMQnbXomUkl?si=12b6315593d44f72"
    coverPath="art/albums/metrotek/metrotek cover.png"
    description="trance never sounded so good"
    key="metrotek"
  />,
  <Release
    title="it was only ever you"
    artist="gain online"
    link="https://open.spotify.com/track/4sCThN1UnNWsFFXsvHGYKR?si=f833a3c43a3b40a7"
    coverPath="art/albums/it was only ever you/it was only ever you cover.png"
    description="all i've ever wanted"
    key="it was only ever you"
  />,
  <Release
    title="A1/A2"
    artist="gain online"
    link="https://open.spotify.com/album/7rsV9PiEv0hvu4GJlrlNts?si=3H0P7RPLT5OTOUO8jqAqyA"
    coverPath="art/albums/51A1-A2/51A1-A2 cover.png"
    description="choose your own adventure acid house"
    key="51A1/A2"
  />,
  <Release
    title="foundation"
    artist="gain online"
    link="https://open.spotify.com/track/6PBcvweW5AqH62YTYQBcnV?si=5b1ac2bc9cfe4a3a"
    coverPath="art/albums/foundation/foundation cover.jpg"
    description="rebuilding from first principles"
    key="foundation"
  />,
  <Release
    title="vertigo relief"
    artist="gain online"
    link="https://open.spotify.com/track/7ek1wL1xtHzmqOFIoyIeVk?si=4b622cfa7c8c4795"
    coverPath="art/albums/vertigo relief/vertigo relief cover.jpg"
    description="a clear mind is a beautiful thing"
    key="vertigo relief"
  />,
];

export const Releases = () => {
  return <div className="flex flex-col gap-8">{allReleases}</div>;
};
