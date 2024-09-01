import "./landing.css";
// import { LandingLogo, MobileCoverLogo } from '../components/logo/logo';
import Link from "next/link";

export default function Landing() {

  return (
    <div className="landing-page-parent">
      <div className="landing-page-content">
        <LandingLogo />
        <Link 
        className="expand-button enter-button"
        // className="expand-button enter-button"
        href="/home"
        // style={{height: "4rem", width: "40%"}}
        // passHref={true}
        >
        enter
        </Link>
      </div>
    </div>
    )
}

function LandingLogo(){
  return (
      <div>
        <img src="/logos/logo black.png" className="landing-logo logo-rotate" />
        {/* <img src="/logos/logo blue.png" className="landing-logo logo-rotate" 
        style={{animationDelay: "0.2s", zIndex: "-1"}}/>
        <img src="/logos/logo purple.png" className="landing-logo logo-rotate" 
        style={{animationDelay: "0.4s", zIndex: "-2"}}/> */}
      </div>
  )
}
