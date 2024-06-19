"use client"

import { useState } from "react"
import { Break } from "../../components/blog/blog"
import { desktopClass, mobileClass, mobileStyles, useIsMobile } from "../../hooks/mobileHooks"
import SelectorButton from "../../components/buttons/selectorButton"
import { MusicLinkBar } from "../../components/linkBar/linkBar"
import "./audio.css"
import Link from "next/link"

export default function AudioPage(){

    const releases = "releases"
    const albums = "albums"
    const playlists = "playlists"
    const listen = "listen"

    const isMobile = useIsMobile()
    const [selected, setSelected] = useState(releases)

    return (
        <div className="page-content-container">
            <h1>gain audio</h1>
            <a>it all starts here</a>
            <div className="audio-selector-container">
                <SelectorButton text={releases} onClick={() => setSelected(releases)} selected={selected == releases} />
                <SelectorButton text={albums} onClick={() => setSelected(albums)} selected={selected == albums} />
                {/* <SelectorButton text={playlists} onClick={() => setSelected(playlists)} selected={selected == playlists} />
                <SelectorButton text={listen} onClick={() => setSelected(listen)} selected={selected == listen} /> */}
            </div>
            {/* <div style={{width: "100%"}}>
                <MusicLinkBar 
                    spotify="https://open.spotify.com/artist/4mkEgOb3c1imuAXwyeSHug?si=59_RlNzZQ4GmodwHSGPdaQ"
                    apple="https://music.apple.com/us/artist/gain-online/1744697316"
                    soundcloud="https://soundcloud.com/gain_online"
                />
            </div> */}
            {selected == releases &&
                // <div style={mobileStyles({display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "blue"})}>
                <div className={isMobile ? "releases-container-mobile" : ""}>
                    <div className={"release-container" + (isMobile ? " release-container-mobile" : "")}>
                        <Link href="/audio/copenhagen" className={"release-image" + (isMobile ? "-mobile" : "")}>
                            <img 
                                src={"/art/albums/copenhagen/copenhagen cover.jpg"} 
                                style={{maxWidth: "100%"}}
                            />
                        </Link>
                        <div className={isMobile ? "release-info-mobile" : "release-info"}>
                            <div style={{fontSize: "2rem", fontWeight: "bold"}}>copenhagen</div>
                            <a style={{color: "var(--secondary-text-color)"}}>1 june 2024</a>
                            <div className="release-text">
                                <MusicLinkBar 
                                    spotify="https://open.spotify.com/track/1kX29xlXs2Aqi02tLduRmP?si=3e8bbb44b7a24b81" 
                                    apple="https://music.apple.com/us/album/copenhagen/1744846213?i=1744846214" 
                                    sx={{marginBottom: "2rem"}}
                                />
                                <a>a journey to the eastern front reveals more than one may expect.</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {selected == albums &&
            <div className={"albums-container" + (isMobile? "-mobile" : "")}>
                <Album
                    cover="/art/albums/deeper still/deeper still album cover.png"
                    title="deeper still"
                    year={2024}
                    route="deeperStill"
                />
                <Album
                    cover="/art/albums/commuter/commuter cover final.jpg"
                    title="commuter"
                    year={2024}
                    route="commuter"
                />
                <Album
                    cover="/art/albums/jungle jungle/jungle jungle cover.jpg"
                    title="jungle jungle"
                    year={2023}
                    route="jungleJungle"
                />
                <Album
                    cover="/art/albums/second life/Second Life Cover.png"
                    title="second life"
                    year={2023}
                    // route="secondLife"
                />
            </div>}
        </div>
    )
}

interface AlbumProps {
    cover: string,
    title: string,
    year: number,
    route?: string
}
function Album(props: AlbumProps){
    const isMobile = useIsMobile()

    const href = `/audio/${props.route}`
    return (
        <div className={"album-item" + (isMobile? "-mobile" : "")}>
            {props.route ? 
            <Link href={href}>
                <img src={props.cover} className="album-image"/>
            </Link> :
            <img src={props.cover} className="album-image"/>
            }
            <div className="album-info">
                <i style={{fontSize: "1.5em", fontWeight: "bold"}}>{props.title}</i>
                <a style={{fontSize: ".75em"}}>{props.year}</a>
            </div>
        </div>
    )
}