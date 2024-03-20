"use client"

import Link from "next/link";
import "./navbar.css";
// import { useRouter } from "next/router";

export default function Navbar(props: any){

    return (
        <span className="navbar-container">
            <NavbarButton title="audio" route="/audio"></NavbarButton>
            <NavbarButton title="visual" route="/visual"></NavbarButton>
            <NavbarButton title="code" route="/code"></NavbarButton>
            {/* <NavbarButton title="blog" route="/blog"></NavbarButton> */}
        </span>
    )
}

interface ButtonProps{
    title: string,
    route: string,
    selected?: boolean,
}
function NavbarButton(props: ButtonProps){

    return (
        <Link 
        className="navbar-button"
        href={props.route}
        prefetch={false}
        key={props.title}>
            {props.title}
        </Link>
    )
}