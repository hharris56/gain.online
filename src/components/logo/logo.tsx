import "./logo.css"
import Link from "next/link"

function DesktopLogo(){
    return (
        <a 
        className="logo-container" 
        href="/home"
        >
            <img src="/logos/logo black.png" className="logo rotate"/>
            <img src="/logos/logo blue.png" className="logo rotate1 shadow" style={{zIndex: "-1"}}/>
            <img src="/logos/logo purple.png" className="logo rotate2 shadow" style={{zIndex: "-2"}}/>
        </a>
    )
}

function MobileCoverLogo(){
    return (
        <div className="mobile-cover-container">
            <img src="/logos/logo black.png" className="mobile-cover-logo mobile-cover-rotate"/>
            {/* <img src="/logos/logo blue.png" className="mobile-cover-logo mobile-cover-rotate shadow" style={{zIndex: "-1", animationName: "rotation2"}}/> */}
            {/* <img src="/logos/logo purple.png" className="mobile-cover-logo rotate2 shadow" style={{zIndex: "-2"}}/> */}
        </div>
    )
}

export { DesktopLogo, MobileCoverLogo }