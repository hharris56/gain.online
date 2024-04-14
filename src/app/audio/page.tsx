"use client"

import { Break } from "../../components/blog/blog"
import { useIsMobile } from "../../hooks/mobileHooks"
import "./audio.css"
import Link from "next/link"

export default function AudioPage(){

    const isMobile = useIsMobile()

    return (
        <div>
            <h1>gain audio</h1>
            <a>it all starts here</a>
            <div className={"albums-container" + (isMobile? "-mobile" : "")}>
                <Album
                    cover="/art/albums/deeper still/deeper still album cover.png"
                    title="deeper still"
                    year={2024}
                />
                <Album
                    cover="/art/albums/Commuter cover final.png"
                    title="commuter"
                    year={2024}
                />
                <Album
                    cover="/art/albums/jungle jungle/timeslip.jpg"
                    title="midnight jungle"
                    year={2023}
                />
                <Album
                    cover="/art/albums/second life/Second Life Cover.png"
                    title="second life"
                    year={2023}
                />
            </div>
        </div>
    )
}

function Album(props: {cover: string, title: string, year: number}){
    const isMobile = useIsMobile()

    const href = `/audio/${props.title}`
    return (
        <div className={"album-item" + (isMobile? "-mobile" : "")}>
            <Link href={href}>
                <img src={props.cover} className="album-image"/>
            </Link>
            <div className="album-info">
                <i style={{fontSize: "1.5em", fontWeight: "bold"}}>{props.title}</i>
                <a style={{fontSize: ".75em"}}>{props.year}</a>
            </div>
        </div>
    )
}