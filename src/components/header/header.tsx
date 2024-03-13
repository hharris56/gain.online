"use client"

import "./header.css"
import Navbar from "../navbar/navbar"
import Logo from "../logo/logo"
import detectWidthBreakPoint from "../../services/mobileService"
import NavbarMobile from "../navbar/navbar-mobile"

export default function Header(props: any){

    const width = window.innerWidth
    console.log("width: " + width)
    const isMobile: any = detectWidthBreakPoint(650)
    console.log("isMobile: " + isMobile)

    return (
        <div className="header-container">
          {isMobile ? <NavbarMobile /> : <Navbar/>}
          <Logo />
          <div className="logo-buffer" />
          {/* <img src="/assets/cloud cropped.png" className="background-image"/> */}
        </div>
    )
}