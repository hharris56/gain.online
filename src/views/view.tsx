"use client"

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { isMobileFn, useIsMobile } from '../hooks/mobileHooks'
import MobileView from './mobileView/mobileView'
import { useEffect, useState } from 'react'
import { debounce } from 'underscore'
import { usePathname } from 'next/navigation'

export default function View({ children, }: 
    { children: React.ReactNode }){

    const pathName = usePathname()

    var newLayout: any = <></>
    newLayout = useIsMobile() ? 
    // mobile view
    <MobileView>
        <div>{children}</div>
    </MobileView> : 
    // desktop view
    <div style={{padding:"2rem", display: "flex", flexDirection: "row"}}>
        <Header />
        {/* <div style={{backgroundColor: "red", minWidth: "11rem", height: "10rem"}}></div> */}
        <div style={{display: "flex", flexDirection: "column", paddingLeft: "2rem"}}>
            <div style={{marginBottom: "2rem", fontSize: "1em"}}>{children}</div>
            <Footer />
        </div>
    </div>
    
    return pathName == "/" ? <>{children}</> : newLayout
}