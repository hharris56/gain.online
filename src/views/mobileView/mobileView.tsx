"use client"

import "./mobileView.css"
import { useState } from "react"
import { MobileCoverLogo } from "../../components/logo/logo"
import MobileHeader from "../../components/header/mobileHeader"
import Footer from "../../components/footer/footer"

export default function MobileView(props: any){
    const [isCover, setCover] = useState(true)

    // return isCover? 
    // (
    //     <div className="mobile-cover">
    //         <div className="enter-mantle">
    //             <div 
    //             className="default-button enter-button" 
    //             onClick={() => setCover(false)}>
    //             enter
    //             </div>
    //         </div>
    //         <MobileCoverLogo />
    //     </div>
    // ) :
    return (
        <>
            <MobileHeader />
                <div style={{padding: '1rem'}}>
                    {props.children}
                </div>
            <Footer />
        </>
    )
}