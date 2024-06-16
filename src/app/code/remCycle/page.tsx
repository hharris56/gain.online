"use client"
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../../../hooks/mobileHooks";
import "./rem.css"

export default function RemCycle(){

    const [time, setTime] = useState(new Date());
    const isMobile = useIsMobile()

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
        let timestring = dt.toLocaleTimeString().split(" ")
        let ampm = timestring.pop()
        let basetime = timestring[0].split(":").slice(0,2).join(":")
        return [basetime, ampm].join(" ")
    }

    const remOption = (n: number) => {
        let d = new Date()
        d.setMinutes(d.getMinutes() + ((n + 1) * 1.5 * 60))

        return (
            <div className="rem-option">
                <a className={"rem-option-time" + (isMobile ? " rem-option-time-mobile" : "")}>
                    {formatTime(d)}
                </a>
                <div className={"rem-decoration number" + n.toString()}>
                    {n + " cycle" + (n == 1 ? "" : "s")}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="rem-page-container">
                <h3 style={{marginTop: "1rem"}}>REM sleep scheduler</h3>
                <a style={{marginTop: "2rem"}}>current time</a>
                <div className={"timer" + (isMobile ? " mobile-timer" : "")}>
                    {formatTime(time)}
                </div>
                <div className="options-container">
                    {[1,2,3,4].map((n) => remOption(n))}
                </div>
                <a style={{margin: "2rem", textAlign: "center"}}>
                    * remember to account for 15 minutes to fall asleep
                </a>
            </div>
        </>
    )
}