"use client"

import "./defaultAudioPage.css"
import { useIsMobile } from "../../hooks/mobileHooks"
import { MusicLinkBar } from "../linkBar/linkBar"
import BackButton from "../buttons/backButton"

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
        <div className={"dap-container" + (isMobile ? " dap-mobile" : "")}>
            <BackButton route="/audio"/>
            {isMobile && <img 
                src={props.cover} 
                className="dap-image"
                style={{width: "75vw"}}
            />}
            <div className="dap-row">
                {!isMobile && <img 
                    src={props.cover} 
                    className="dap-image"
                />}
                <div className="dap-text-container">
                    <div style={{fontSize: "2rem", fontWeight: "bold", textAlign: "center"}}>{props.title}</div>
                    <a style={{color: "var(--secondary-text-color)", textAlign: "center"}}>{props.date}</a>
                    <div className="dap-text" style={{marginTop: "2rem", padding: isMobile ? "0rem" : ""}}>
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