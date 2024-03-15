"use client"

import "./header.css"
import { useState } from "react"
import NavbarMobile from "../navbar/mobileNavbar"

export default function MobileHeader(props: any){
    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className="mobile-header">
            <div className="mobile-header-content">
                <div style={{display: "flex"}}>
                    <a>gain.</a>
                    <b>online</b>
                </div>
                <img src="/logos/logo black.png" className="mobile-header-logo"
                style={{rotate: isExpanded? "45deg" : "0deg"}}
                onClick={() => setExpanded(!isExpanded)}/>
            </div>
            {isExpanded? <NavbarMobile/> : <></>}
        </div>
    )

}