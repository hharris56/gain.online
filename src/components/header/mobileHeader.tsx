"use client"

import "./header.css"
import { useState } from "react"
import NavbarMobile from "../navbar/mobileNavbar"
import Link from "next/link"
import DropDownButton from "../buttons/dropdownButton"

export default function MobileHeader(props: any){
    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className="mobile-header">
            <div className="mobile-header-buffer"></div>
            <div className="mobile-header-content" style={{paddingRight: ".5rem"}}>
                <Link 
                href="/"
                className="mobile-header-online">
                    <a style={{fontSize: "1.5rem"}}>gain.<b>online</b></a>
                    <a style={{fontSize: "0.75rem", marginLeft: "1rem", marginTop: "-.3rem"}}>sound seeker</a>
                </Link>
                <DropDownButton color="black" expanded={isExpanded} callback={() => setExpanded(!isExpanded)} />
            </div>
            <NavbarMobile expanded={isExpanded} callback={setExpanded}/>
        </div>
    )
}