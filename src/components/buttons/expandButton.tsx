"use client"
import "./buttons.css"
import { useIsMobile } from "../../hooks/mobileHooks"

export default function ExpandButton(props: {expanded?: boolean, callback: any}){
    const isMobile = useIsMobile()
    const dotClass = isMobile? "dotdotdot-mobile" : "dotdotdot"

    if (props.expanded != null){
        return (
            <div className="expand-button" onClick={props.callback}>
                {!props.expanded ?
                <div style={{display:"flex", flexDirection:"row", width:"fit-content"}}>
                    <h1 className={dotClass}>.</h1>
                    <h1 className={dotClass} style={{animationDelay:"0.2s"}}>.</h1>
                    <h1 className={dotClass} style={{animationDelay:"0.4s"}}>.</h1>
                </div> :
                <img src="/logos/logo black.png" style={{maxHeight: "100%", rotate: "45deg"}}/>
                }
            </div>
        )
    }
    return (
        <div className="expand-button" onClick={props.callback}>
            <div style={{display:"flex", flexDirection:"row", width:"fit-content"}}>
                <h1 className={dotClass}>.</h1>
                <h1 className={dotClass} style={{animationDelay:"0.2s"}}>.</h1>
                <h1 className={dotClass} style={{animationDelay:"0.4s"}}>.</h1>
            </div>
        </div>
    )
}