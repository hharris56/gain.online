"use client"

import "./header.css"
import { useState } from "react"
import NavbarMobile from "../navbar/mobileNavbar"
import Link from "next/link"
import DropDownButton from "../buttons/dropdownButton"

export default function MobileHeader(props: any){
    const [isExpanded, setExpanded] = useState(false)
    const [hasExpanded, setHasExpanded] = useState(false)

    return (
        <div className="mobile-header">
            <div className="mobile-header-buffer"></div>
            <div className="mobile-header-content" style={{paddingRight: ".5rem"}}>
                <Link 
                href="/"
                className="mobile-header-online">
                    gain.<b>online</b>
                </Link>
                <div style={{display: "flex", alignContent: "center"}}>
                    {!hasExpanded && <img src="/icons/arrow right.svg" style={{width: "2rem"}} className="mobile-menu-arrow"/>}
                    <DropDownButton color="black" expanded={isExpanded} callback={() => {setExpanded(!isExpanded); setHasExpanded(true)}} />
                </div>
            </div>
            <NavbarMobile expanded={isExpanded} callback={setExpanded}/>
        </div>
    )
}