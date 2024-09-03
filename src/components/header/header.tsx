"use client"
import "./header.css"
import { Navbar, VerticalNavbar } from "../navbar/navbar"
import { DesktopLogo } from "../logo/logo"
import { useState } from "react"
import DropdownButton from "../buttons/dropdownButton"

function Header(props: any){
  const [isExpanded, setExpanded] = useState(false)
  const [hasExpanded, setHasExpanded] = useState(false)

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
            <DropdownButton size="8rem" expanded={isExpanded} callback={() => {setExpanded(!isExpanded); setHasExpanded(true)}}/>
            {/* <img src="/logos/logo black.png" className="header-logo"/> */}
            {/* <img src="/logos/cloud logo blank.png" className="cloud-logo"/> */}
          </div>
            <VerticalNavbar expanded={isExpanded}/>
          <div style={{display: "flex", justifyContent: "center"}}>
            {
              !hasExpanded && <img src="/icons/arrow up.svg" style={{width: "4rem"}} className="menu-arrow"/>
            }
          </div>
        </div>
    )
}

function HeaderBuffer(){
  return (
    <div style={{minWidth: "11rem", minHeight: "11rem"}}/>
  )
}

export {Header, HeaderBuffer}