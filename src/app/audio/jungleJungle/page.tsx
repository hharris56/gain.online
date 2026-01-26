"use client";

import "../audio.css";
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage";
import { useEffect } from "react";

export default function JungleJungle() {
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#f23430");
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
      title="jungle jungle"
      date="19 november 2023"
      cover="/art/albums/jungle jungle/jungle jungle cover.jpg"
      links={{
        spotify:
          "https://open.spotify.com/album/5o10I4PQsEjcVQe04l0JOn?si=dlxkk5PaTAuHDTR45ZL9Nw",
        apple: "https://music.apple.com/us/album/jungle-jungle/1747786677",
      }}
      description="celebrate the night."
    />
  );
}
