"use client";

import { useEffect } from "react";
import "../audio.css";
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage";

export default function Commuter() {
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", "lightgrey");
  }, []);

  return (
    <DefaultAudioPage
      title="commuter"
      date="26 january 2024"
      cover="/art/albums/commuter/commuter cover final.jpg"
      links={{
        spotify:
          "https://open.spotify.com/album/3OJlLVkQbBlBiYcizvPXWc?si=IvB-1BoUTWGEkKZq1p2vLQ",
        apple: "https://music.apple.com/us/album/commuter-ep/1746794979",
      }}
      description="a jazz jungle ep inspired by the sounds of the morning commute. this project came to be while searching for different sounds to use as background noise in the ep's first single 'tuned in'. i ended up finding a morning radio traffic report that fit so well with the track it sparked the idea for commuter and the rest was history. my favorite songs off the ep are 'european domestic' and 'marlboro red light'."
    />
  );
}
