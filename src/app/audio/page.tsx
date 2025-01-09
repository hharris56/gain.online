"use client"

import { useState } from "react"
import { useIsMobile } from "../../hooks/mobileHooks"
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
            <div style={{marginBottom: "1rem"}}>
                <h1>gain audio</h1>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <a>lofi / ambient  house + jungle + breakcore.</a>
                    <a>sound seeker.</a>
                </div>
            </div>
            <div className="audio-selector-container" style={{marginTop: "1rem"}}>
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
                <div className={"albums-container" + (isMobile? "-mobile" : "")}>
                    <Album
                        cover="/art/albums/overseas/overseas cover.jpg"
                        title="overseas"
                        year={2025}
                        route="overseas"
                    />
                    <Album
                        cover="/art/albums/binary sky/binary sky cover.jpg"
                        title="binary sky"
                        year={2024}
                        route="binarySky"
                    />
                    <Album
                        cover="/art/albums/barsbuttel step/barsbuttel step cover.png"
                        title="barsbuttel step"
                        year={2024}
                        route="barsbuttelStep"
                    />
                    <Album
                        cover="/art/albums/copenhagen/copenhagen cover.jpg"
                        title="copenhagen"
                        year={2024}
                        route="copenhagen"
                    />
                    {/* <Release
                        title="binary sky"
                        date="3 september 2024"
                        cover="/art/albums/binary sky/binary sky cover.jpg"
                        route="/audio/binarySky"
                        links={{
                            spotify: "https://open.spotify.com/album/0hvk7wFYTcV4DndMn79X24?si=xUuXK6gqTUCwWha905ja7g",
                            apple: "https://music.apple.com/us/album/binary-sky-single/1767128385" 
                            }}
                        description="sometimes diving in blind is the only way to see the other side."
                    />
                    <Release
                        title="barsbuttel step"
                        date="2 august 2024"
                        cover="/art/albums/barsbuttel step/barsbuttel step cover.png"
                        route="/audio/barsbuttelStep"
                        links={{
                            spotify: "https://open.spotify.com/album/1gNbnzo50mqxwiWbDvnSyv?si=DT6z217VQpaB5Z5HnsYHwQ",
                            apple: "https://music.apple.com/us/album/barsbuttel-step-single/1759280614" 
                            }}
                        description="deep sounds from hamburg's club scene pour out into the surrounding streets."
                    />
                    <Release
                        title="copenhagen"
                        date="1 june 2024"
                        cover="/art/albums/copenhagen/copenhagen cover.jpg"
                        route="/audio/copenhagen"
                        links={{
                            spotify: "https://open.spotify.com/album/1w25geZB4DstHJMsNZ4H8A?si=CzIUu5LSTUGDOz7mY_1hUA",
                            apple: "https://music.apple.com/us/album/copenhagen/1744846213?i=1744846214" 
                            }}
                        description="a journey to the eastern front reveals more than you might expect."
                    /> */}
                    {/* <div className="release-container-mobile">
                        <Link href="/audio/binarySky">
                            <img src="/art/albums/binary sky/binary sky cover.jpg" className="release-image-mobile"/>
                        </Link>
                        <div className="release-info-mobile" style={{color: "#5e61ff"}}>
                            <a>binary</a>
                            <a>sky</a>
                        </div>
                    </div>
                    <div className="release-container-mobile">
                        <Link href="/audio/barsbuttelStep">
                            <img src="/art/albums/barsbuttel step/barsbuttel step cover.png" className="release-image-mobile"/>
                        </Link>
                        <div className="release-info-mobile" style={{color: "#0bb774", textAlign: "left"}}>
                            <a style={{fontSize: "1.75rem"}}>barsbuttel</a>
                            <a>step</a>
                        </div>
                    </div>
                    <div className="release-container-mobile">
                        <Link href="/audio/copenhagen">
                            <img src="/art/albums/copenhagen/copenhagen cover.jpg" className="release-image-mobile"/>
                        </Link>
                        <div className="release-info-mobile" style={{color: "#f7b140"}}>
                            <a>copen</a>
                            <a style={{fontSize: "1.75rem"}}>hagen</a>
                        </div>
                    </div> */}
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

interface ReleaseProps {
    cover: string,
    title: string,
    date: string,
    route: string
    links?: any
    description?: string
}
function Release(props: ReleaseProps){
    const isMobile = useIsMobile()
    return isMobile ?
    // mobile
    (
        // <Link href={props.route}>
        //     <div className="release-container-mobile">
        //         <img src={props.cover} className="release-image-mobile"/>
        //         <div className="release-info-mobile">
        //             <h3 style={{margin: "0.5rem 0.5rem 0rem 0.5rem"}}>{props.title}</h3>
        //             <a className="release-date-mobile">{props.date}</a>
        //             <a className="release-description-mobile">{props.description}</a>
        //         </div>
        //     </div>
        // </Link>
        <div className="release-container-mobile">
            <Link href={props.route}>
                <img src={props.cover} className="release-image-mobile"/>
            </Link>
            <div className="release-info-mobile">
                <a style={{fontSize: "1.5em", fontWeight: "bold"}}>{props.title}</a>
                {/* <a style={{fontSize: ".75em"}}>{props.date}</a>
                <a className="release-description-mobile">{props.description}</a> */}
            </div>
            {/* <MusicLinkBar links={props.links} sx={{margin: "1rem 0rem"}}/> */}
        </div>
    ) :
    // desktop
    (
        <div>
            <div className={"release-container"}>
                <Link href={props.route} className="release-image">
                    <img 
                        src={props.cover} 
                        style={{maxWidth: "100%"}}
                    />
                </Link>
                <div className="release-info">
                    
                    <div className="release-text">
                        <h2 style={{marginBottom: "0rem"}}>{props.title}</h2>
                        <a style={{color: "var(--secondary-text-color)", fontSize: "1rem"}}>{props.date}</a>
                        <MusicLinkBar 
                            links={props.links}
                            sx={{margin: "2rem 0rem"}}
                        />
                        <a>{props.description}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}