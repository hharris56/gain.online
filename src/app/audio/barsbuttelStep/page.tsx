"use client";

import { useLayoutEffect } from "react";
import "../audio.css";
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage";

export default function BarsbuttelStep() {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#7823c0");
    document.documentElement.style.setProperty(
      "--primary-text-color",
      "#0bb774",
    );
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      "#f043be",
    );
  }, []);

  return (
    <div>
      <DefaultAudioPage
        title="barsbuttel step"
        date="2 august 2024"
        cover="/art/albums/barsbuttel step/barsbuttel step cover.png"
        links={{
          spotify:
            "https://open.spotify.com/album/1gNbnzo50mqxwiWbDvnSyv?si=DT6z217VQpaB5Z5HnsYHwQ",
          apple:
            "https://music.apple.com/us/album/barsbuttel-step-single/1756583733",
        }}
        description="deep sounds from hamburg's club scene pour out into the surrounding streets."
      />
    </div>
  );
}
