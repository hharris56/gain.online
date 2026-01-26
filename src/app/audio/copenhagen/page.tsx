"use client";

import "../audio.css";
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage";
import { useLayoutEffect } from "react";

export default function Copenhagen() {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#3875f8");
    document.documentElement.style.setProperty(
      "--primary-text-color",
      "#f7b140",
    );
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      "#f23430",
    );
  }, []);

  return (
    <DefaultAudioPage
      title="copenhagen"
      date="1 june 2024"
      cover="/art/albums/copenhagen/copenhagen cover.jpg"
      links={{
        spotify:
          "https://open.spotify.com/track/1kX29xlXs2Aqi02tLduRmP?si=3e8bbb44b7a24b81",
        apple:
          "https://music.apple.com/us/album/copenhagen/1744846213?i=1744846214",
      }}
      description="a journey to the eastern front reveals more than you might expect."
    />
  );
}
