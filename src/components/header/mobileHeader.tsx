"use client"

import "./header.css"
import { useState } from "react"
import NavbarMobile from "../navbar/mobileNavbar"
import Link from "next/link"

export default function MobileHeader(props: any){
    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className="mobile-header">
            <div className="mobile-header-content">
                <Link 
                href="/landing"
                className="mobile-header-online">
                    <a>gain.</a>
                    <b>online</b>
                </Link>
                <img src="/logos/logo black.png" className="mobile-header-logo"
                style={{rotate: isExpanded? "45deg" : "0deg"}}
                onClick={() => setExpanded(!isExpanded)}/>
            </div>
            <NavbarMobile expanded={isExpanded} callback={setExpanded}/>
        </div>
    )

}