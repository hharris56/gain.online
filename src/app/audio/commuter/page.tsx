"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import { MusicLinkBar } from "../../../components/linkBar/linkBar"

export default function Commuter(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--accent-color", "lightgrey");

    return (
        <div className={"album-page-container" + (isMobile ? " album-page-mobile" : "")}>
            {isMobile && <img 
                src={"/art/albums/commuter/commuter cover final.jpg"} 
                className="album-image"
                style={{width: "75vw"}}
            />}
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/commuter/commuter cover final.jpg"} 
                    className="album-page-image"
                />}
                <div className="album-page-text">
                    <MusicLinkBar spotify="https://open.spotify.com/album/3OJlLVkQbBlBiYcizvPXWc?si=IvB-1BoUTWGEkKZq1p2vLQ" apple="https://music.apple.com/us/album/commuter-ep/1746794979" />
                    <a>a jazz jungle ep inspired by the sounds of the morning commute. this project came to be while searching for different sounds to use as background noise in the ep's first single 'tuned in'. i ended up finding a morning radio traffic report that fit so well with the track it sparked the idea for <i>commuter</i> and the rest was history. my favorite songs off the ep are 'european domestic' and 'marlboro red light'.</a>
                </div>
            </div>
            {/* <div className="album-page-row">
                <img 
                    src={"/art/albums/commuter/commuter front cover.jpg"} 
                    className="album-page-image"
                />
                <img 
                    src={"/art/albums/commuter/commuter back cover.jpg"} 
                    className="album-page-image"
                />
            </div> */}
        </div>
    )
}