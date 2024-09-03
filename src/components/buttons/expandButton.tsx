"use client"
import "./buttons.css"
import { useIsMobile } from "../../hooks/mobileHooks"

export default function ExpandButton(props: {expanded?: boolean, callback: any, text?: string, color?: string}){
    const isMobile = useIsMobile()
    const dotClass = isMobile? "dotdotdot-mobile" : "dotdotdot"
    // const content = props.text ?? (
    //     <>
    //         <h1 className={dotClass}>.</h1>
    //         <h1 className={dotClass} style={{animationDelay:"0.2s"}}>.</h1>
    //         <h1 className={dotClass} style={{animationDelay:"0.4s"}}>.</h1>
    //     </>
    // )
    const content = props.text ?? (
        <img src="/logos/logo black.png" style={{maxHeight: "100%"}}/>
    )

    if (props.expanded != null){
        return (
            <div className="expand-button" onClick={props.callback}>
                {!props.expanded ?
                // <div style={{display:"flex", flexDirection:"row", width:"fit-content"}}>
                //     {content}
                // </div> :
                <img src={`/logos/logo ${props.color ?? "black"}.png`} style={{maxHeight: "100%"}}/> : 
                <img src={`/logos/logo ${props.color ?? "black"}.png`} style={{maxHeight: "100%", rotate: "45deg"}}/>
                }
            </div>
        )
    }
    return (
        <div className="expand-button" onClick={props.callback}>
            <div style={{display:"flex", flexDirection:"row", width:"fit-content"}}>
                {content}
            </div>
        </div>
    )
}