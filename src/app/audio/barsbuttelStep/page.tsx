"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage"

export default function BarsbuttelStep(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#7823c0");
    document.documentElement.style.setProperty("--primary-text-color", "#0bb774");
    document.documentElement.style.setProperty("--secondary-text-color", "#f043be");
 
    return (
        <div>
            <DefaultAudioPage
                title="barsbuttel step"
                date="12 july 2024"
                cover="/art/albums/barsbuttel step/barsbuttel step cover.png"
                links={{
                    spotify: "https://open.spotify.com/track/6xp56OOUFoxyRmiHnCT0zr?si=2m2K02FBQQO9L95TcAgDCA",
                    apple: "https://music.apple.com/us/album/barsbuttel-step-single/1756583733"
                }}
                description="deep sounds from berlin pour out into the surrounding streets."
            />
        </div>
    )
}