"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage"

export default function Overseas(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    // document.documentElement.style.setProperty("--accent-color", "#5489d8");
    document.documentElement.style.setProperty("--primary-text-color", "white");
    document.documentElement.style.setProperty("--secondary-text-color", "#f05db0");

    return (
        <>
            <DefaultAudioPage
                title="overseas"
                date="10 january 2024"
                cover="/art/albums/overseas/overseas cover.jpg"
                links={{
                    spotify: "https://open.spotify.com/album/6EHllJmgFCdGQoR9yV3fD4?si=y4WqHILAQeSkq7DA5SWj7g",
                    apple: "https://music.apple.com/us/album/overseas/1788945323"
                }}
                description="the pursuit of desire comes at a price... one night overseas can change everything"
            />
            <p hidden>inspired by the bleak landscapes and brutalist architecture of central and eastern europe, 'overseas' explores spiritual and emotional burdens derived from the pursuit of pleasure, recounting the events of an unknown protaganist during a single night overseas.</p>
            <p hidden>the desolate soundscapes and droning pads punctuated by lush arps and kicking basslines create a wave of sounds and emotions that wash away, leaving traces of some featureless longing in its wake.</p>
        </>
    )
}