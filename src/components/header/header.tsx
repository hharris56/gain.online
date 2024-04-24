"use client"
import "./header.css"
import { Navbar, VerticalNavbar } from "../navbar/navbar"
import { DesktopLogo } from "../logo/logo"
import { useState } from "react"
import DropdownButton from "../buttons/dropdownButton"

export default function Header(props: any){
  const [isExpanded, setExpanded] = useState(false)

    return (
        // HORIZONTAL HEADER
        // <div className="header-container">
        //   <Navbar />
        //   <DesktopLogo />
        //   <div className="logo-buffer" />
        //   {/* <img src="/assets/cloud cropped.png" className="background-image"/> */}
        // </div>

        // VERTICAL HEADER
        <div className="vheader-container">
          <div className="vlogo-buffer">
            <DropdownButton size="8rem" expanded={isExpanded} callback={() => setExpanded(!isExpanded)}/>
          </div>
          <VerticalNavbar expanded={isExpanded}/>
        </div>
    )
}