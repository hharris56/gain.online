"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage"
import FlightBoard from "../../../components/flightBoard/flightBoard"

export default function Overseas(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    // document.documentElement.style.setProperty("--accent-color", "#5489d8");
    document.documentElement.style.setProperty("--primary-text-color", "white");
    document.documentElement.style.setProperty("--secondary-text-color", "#f05db0");

    const boardRows = [
        "time    destination       gate   status   ",
        "05:12   copenhagen        c14    departed ",
        "04:56   100cc             a02    gate open",
        "03:56   barsbuttel step   a11    departed ",
        "02:55   vitamin pushh     b07    on-time  ",
        "05:20   action            b33    on-time  ",
        "02:04   march interlude   ---    ---------",
        "05:33   binary sky        a10    departed ",
        "05:06   true virtue       c02    gate open",
        "02:51   chariot           b23    boarding ",
        "04:57   sunwalker         b19    on-time  ",
        "08:03   eastern front     c16    on-time  ",
        // "                 overseas                 "
    ]

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
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <FlightBoard rows={boardRows} sx={{margin: "2rem 0rem"}}/>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                <div style={{maxWidth: "50rem"}}>
                    <h2 style={{width: "100%", textAlign: "center"}}>abstract:</h2>
                    <p>inspired by the bleak landscapes and brutalist architecture of central and eastern europe, 'overseas' explores spiritual and emotional burdens derived from the pursuit of pleasure, recounting the events of an unknown protaganist during a single night overseas.</p>
                    <p>the desolate soundscapes and droning pads punctuated by lush arps and kicking basslines create a wave of sound and emotion that rush past, leaving traces of some featureless longing in their wake.</p>
                    <p>+ gain</p>
                </div>
            </div>
        </>
    )
}