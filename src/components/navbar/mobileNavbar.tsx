"use client"

import Link from "next/link";
import "./navbar.css";
// import { useRouter } from "next/router";

export default function mobileNavbar(props: {expanded: boolean, callback: (expanded: boolean) => void}){

    return (
        <div className="mobile-navbar-container"
        style={{height: props.expanded? "" : "0rem"}}>
            <MobileNavbarButton title="home" route="/home" callback={props.callback}/>
            <MobileNavbarButton title="audio" route="/audio" callback={props.callback}/>
            <MobileNavbarButton title="visual" route="/visual" callback={props.callback}/>
            <MobileNavbarButton title="code" route="/code" callback={props.callback}/>
        </div>
    )
}

interface ButtonProps{
    title: string,
    route: string,
    selected?: boolean
    callback: (expanded: boolean) => void
}
function MobileNavbarButton(props: ButtonProps){

    return (
        <Link 
        className="mobile-navbar-button"
        href={props.route} 
        key={props.title}
        onClick={() => {props.callback(false)}}>
            {props.title}
        </Link>
    )
}