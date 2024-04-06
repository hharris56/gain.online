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
            <div className="mobile-header-content">
                <Link 
                href="/"
                className="mobile-header-online">
                    gain.<b>online</b>
                </Link>
                <DropDownButton expanded={isExpanded} callback={() => setExpanded(!isExpanded)} />
            </div>
            <NavbarMobile expanded={isExpanded} callback={setExpanded}/>
        </div>
    )

}