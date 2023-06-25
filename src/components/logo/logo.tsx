import "./logo.css"
import Link from "next/link"

export default function Logo(){

    let hover: boolean = false;

    return (
        <Link 
        className="logo-container" 
        href="/landing"
        >
            <img src="/logos/logo black.png" className="logo rotate"/>
            <img src="/logos/logo purple.png" className="logo rotate1 shadow" style={{zIndex: "-1"}}/>
            <img src="/logos/logo green.png" className="logo rotate2 shadow" style={{zIndex: "-2"}}/>
        </Link>
    )
}