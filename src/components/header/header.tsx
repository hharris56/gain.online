"use client"
import "./header.css"
import { Navbar, VerticalNavbar } from "../navbar/navbar"
import { DesktopLogo } from "../logo/logo"
import { useState } from "react"
import DropdownButton from "../buttons/dropdownButton"

function Header(props: any){
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
            {/* <DropdownButton size="8rem" expanded={false} callback={() => setExpanded(!isExpanded)}/> */}
            <img src="/logos/logo black.png" className="header-logo"/>
            {/* <img src="/logos/cloud logo blank.png" className="cloud-logo"/> */}
          </div>
            <VerticalNavbar expanded={true}/>
        </div>
    )
}

function HeaderBuffer(){
  return (
    <div style={{minWidth: "11rem", minHeight: "11rem"}}/>
  )
}

export {Header, HeaderBuffer}