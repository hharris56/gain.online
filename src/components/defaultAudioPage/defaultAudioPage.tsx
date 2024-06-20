"use client"

import "./defaultAudioPage.css"
import { useIsMobile } from "../../hooks/mobileHooks"
import { MusicLinkBar } from "../linkBar/linkBar"

interface AudioPageProps{
    cover: string,
    title: string,
    date?: string,
    links?: any
    description?: string
}
export default function DefaultAudioPage(props: AudioPageProps){
    const isMobile = useIsMobile()

    return (
        <div className={"album-page-container" + (isMobile ? " album-page-mobile" : "")}>
            {isMobile && <img 
                src={props.cover} 
                className="album-image"
                style={{width: "75vw"}}
            />}
            <div className="album-page-row">
                {!isMobile && <img 
                    src={props.cover} 
                    className="album-page-image"
                />}
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "2rem"}}>
                    <div style={{fontSize: "2rem", fontWeight: "bold", textAlign: "center"}}>{props.title}</div>
                    <a style={{color: "var(--secondary-text-color)", textAlign: "center"}}>{props.date}</a>
                    <div className="album-page-text" style={{marginTop: "2rem"}}>
                        <MusicLinkBar 
                            links={props.links}
                            sx={{marginBottom: "2rem"}}
                        />
                        <a>{props.description}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}