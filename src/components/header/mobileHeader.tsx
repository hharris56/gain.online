"use client"

import "./header.css"
import { useState, useEffect, useCallback } from "react"
import NavbarMobile from "../navbar/mobileNavbar"
import Link from "next/link"
import DropDownButton from "../buttons/dropdownButton"

export default function MobileHeader(props: any){
    const [isExpanded, setExpanded] = useState(false)

    // start
    const releaseDate = new Date("January 10, 2025 09:00:00")
    const [time, setTime] = useState(new Date());

    const refreshClock = useCallback(() => {
        setTime(new Date());
    }, [setTime]);
    
    useEffect(() => {
        const timerID = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    }, [refreshClock]);

    const formatTime = (dt: Date) => {
        let TwoString = (num: number) => {
            let str = num.toString()
            if (str.length < 2) return "0" + str
            else return str
        }
        let difference = releaseDate.getTime() - time.getTime()
        let hours = Math.floor(difference / 1000 / 60 / 60)
        difference = difference - (hours * 1000 * 60 * 60)
        let minutes = Math.floor((difference) / 1000 / 60)
        difference = difference - (minutes * 1000 * 60)
        let seconds = Math.floor((difference) / 1000)
        return `${TwoString(hours)}:${TwoString(minutes)}:${TwoString(seconds)}`
    }

    // end

    return (
        <div className="mobile-header">
            <div className="mobile-header-buffer"></div>
            <div className="mobile-header-content" style={{paddingRight: ".5rem"}}>
                <div 
                // href="/"
                className="mobile-header-online">
                    {/* <a style={{fontSize: "1.5rem"}}>gain.<b>online</b></a> */}
                    <div style={{fontSize: "1.5rem"}}><b>{
                        releaseDate.getTime() - time.getTime() > 1000 ?
                        formatTime(time)
                        : "online"}
                    </b></div>
                    {/* <div style={{fontSize: "1.5rem"}}><b>online</b></div> */}
                    {/* <div style={{fontSize: "0.75rem", marginLeft: "1rem", marginTop: "-.3rem"}}>sound seeker</div> */}
                </div>
                <DropDownButton color="black" expanded={isExpanded} callback={() => setExpanded(!isExpanded)} />
            </div>
            <NavbarMobile expanded={isExpanded} callback={setExpanded}/>
        </div>
    )
}