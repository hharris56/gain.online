"use client"
import "./header.css"
import { Navbar, VerticalNavbar } from "../navbar/navbar"
import { DesktopLogo } from "../logo/logo"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import DropdownButton from "../buttons/dropdownButton"

function Header(props: any){
  const [isExpanded, setExpanded] = useState(false)

      // start
      // const releaseDate = new Date("January 10, 2025 09:00:00")
      // const [time, setTime] = useState(new Date());
  
      // const refreshClock = useCallback(() => {
      //     setTime(new Date());
      // }, [setTime]);
      
      // useEffect(() => {
      //     const timerID = setInterval(refreshClock, 1000);
      //     return function cleanup() {
      //         clearInterval(timerID);
      //     };
      // }, [refreshClock]);
  
      // const formatTime = (dt: Date) => {
      //     let TwoString = (num: number) => {
      //         let str = num.toString()
      //         if (str.length < 2) return "0" + str
      //         else return str
      //     }
      //     let difference = releaseDate.getTime() - time.getTime()
      //     let hours = Math.floor(difference / 1000 / 60 / 60)
      //     difference = difference - (hours * 1000 * 60 * 60)
      //     let minutes = Math.floor((difference) / 1000 / 60)
      //     difference = difference - (minutes * 1000 * 60)
      //     let seconds = Math.floor((difference) / 1000)
      //     return `${TwoString(hours)}:${TwoString(minutes)}:${TwoString(seconds)}`
      // }
  
      // end

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
            {/* <img src="/logos/logo black.png" className="header-logo"/> */}
            {/* <img src="/logos/cloud logo blank.png" className="cloud-logo"/> */}
          </div>
          <Link href="/audio/overseas" style={{width: "80%", textAlign: "center", wordWrap: "break-word"}}>
            <h3>{"> overseas <"}</h3>
          </Link>
          <VerticalNavbar expanded={isExpanded}/>
        </div>
    )
}

function HeaderBuffer(){
  return (
    <div style={{minWidth: "11rem", minHeight: "11rem"}}/>
  )
}

export {Header, HeaderBuffer}