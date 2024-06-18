"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import { MusicLinkBar } from "../../../components/linkBar/linkBar"

export default function JungleJungle(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#f23430");
    document.documentElement.style.setProperty("--primary-text-color", "#f7b140");

    return (
        <div className={"album-page-container" + (isMobile ? " album-page-mobile" : "")}>
            {isMobile && <img 
                src={"/art/albums/jungle jungle/jungle jungle cover.jpg"} 
                className="album-image"
                style={{width: "75vw"}}
            />}
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/jungle jungle/jungle jungle cover.jpg"} 
                    className="album-page-image"
                />}
                <div className="album-page-text">
                    <MusicLinkBar spotify="https://open.spotify.com/album/5o10I4PQsEjcVQe04l0JOn?si=dlxkk5PaTAuHDTR45ZL9Nw" apple="https://music.apple.com/us/album/jungle-jungle/1747786677" />
                    <a>celebrate the night.</a>
                </div>
            </div>
        </div>
    )
}