"use client"

import "../audio.css"
import { useIsMobile, mobileClass } from "../../../hooks/mobileHooks"
import { MusicLinkBar } from "../../../components/linkBar/linkBar"

export default function Copenhagen(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#f23430");
    document.documentElement.style.setProperty("--primary-text-color", "#f7b140");
 
    return (
        <div className={"album-page-container" + mobileClass("album-page-mobile")}>
            {isMobile && <img 
                src={"/art/albums/jungle jungle/jungle jungle cover.jpg"} 
                className="album-image"
                style={{width: "75vw"}}
            />}
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/copenhagen/copenhagen cover.jpg"} 
                    className="album-page-image"
                />}
                <div className="album-page-text">
                    <MusicLinkBar spotify="https://open.spotify.com/track/1kX29xlXs2Aqi02tLduRmP?si=3e8bbb44b7a24b81" apple="https://music.apple.com/us/album/copenhagen/1744846213?i=1744846214" />
                    <a>a journey to the eastern front reveals more than one may expect.</a>
                </div>
            </div>
        </div>
    )
}