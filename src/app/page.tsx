"use client"

import "./landing.css";
import { useRouter } from "next/navigation";
// import { LandingLogo, MobileCoverLogo } from '../components/logo/logo';
import Link from "next/link";

export default function Landing() {

  return (
    <div className="landing-page-parent">
      <div className="landing-page-content">
        <LandingLogo />
        {/* <Link 
        className="expand-button enter-button"
        // className="expand-button enter-button"
        href="/home"
        // style={{height: "4rem", width: "40%"}}
        // passHref={true}
        >
        enter
        </Link> */}
      </div>
    </div>
    )
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function LandingLogo(){
  const router = useRouter()

  return (
      <div>
        <img src="/logos/logo white.png" className="landing-logo logo-rotate" id="logo" tabIndex={0} 
        onClick={() => sleep(900).then(() => router.push("/me")) }/>
        {/* <img src="/logos/logo blue.png" className="landing-logo logo-rotate" 
        style={{animationDelay: "0.2s", zIndex: "-1"}}/>
        <img src="/logos/logo purple.png" className="landing-logo logo-rotate" 
        style={{animationDelay: "0.4s", zIndex: "-2"}}/> */}
      </div>
  )
}
