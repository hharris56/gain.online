"use client"

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useIsMobile } from '../hooks/mobileHooks'
import MobileView from './mobileView/mobileView'
import { usePathname } from 'next/navigation'
import ColorManager from '../hooks/colorManager'

export default function View({ children, }: 
    { children: React.ReactNode }){

    const pathName = usePathname()
    const cm = new ColorManager
    cm.resetColors()

    var newLayout: any = <></>
    newLayout = useIsMobile() ? 
    // mobile view
    <MobileView>
        <div>{children}</div>
    </MobileView> : 
    // desktop view
    <div style={{padding:"2rem", display: "flex", flexDirection: "row"}}>
        <Header />
        <div style={{display: "flex", flexDirection: "column", padding: "0rem 2rem"}}>
            <div style={{marginBottom: "2rem", fontSize: "1rem"}}>{children}</div>
            <Footer />
        </div>
    </div>
    
    // on landing page, don't show layout
    return pathName == "/" ? 
        <>{children}</> 
        : 
        <div className="webpage-container">
            {newLayout}
        </div>
}