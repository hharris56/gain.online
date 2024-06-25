import "./logo.css"
import Link from "next/link"

function DesktopLogo(){
    return (
        <Link 
        className="logo-container" 
        href="/home"
        >
            <img src="/logos/logo black.png" className="logo rotate"/>
            <img src="/logos/logo blue.png" className="logo rotate1 shadow" style={{zIndex: "-1"}}/>
            <img src="/logos/logo white.png" className="logo rotate2 shadow" style={{zIndex: "-2"}}/>
        </Link>
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

function LandingLogo(){
    return (
        <div className="landing-logo-platform">
            <img src="/logos/logo black.png" className="landing-logo logo-rotate" />
            <img src="/logos/logo blue light.png" className="landing-logo logo-rotate" 
            style={{animationDelay: "0.2s", zIndex: "-1"}}/>
            <img src="/logos/logo purple.png" className="landing-logo logo-rotate" 
            style={{animationDelay: "0.4s", zIndex: "-2"}}/>
        </div>
    )
}

export { DesktopLogo, MobileCoverLogo, LandingLogo }