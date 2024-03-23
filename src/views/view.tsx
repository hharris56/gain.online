"use client"

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { isMobileFn } from '../hooks/mobileHooks'
import MobileView from './mobileView/mobileView'
import { useEffect, useState } from 'react'
import { debounce } from 'underscore'
import { usePathname } from 'next/navigation'

export default function View({
    children,
    }: {
    children: React.ReactNode
    }){

    const [layout, setLayout] = useState<any>(
        isMobileFn() ? 
        // mobile view
        <MobileView>
            <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
        </MobileView> : 
        // desktop view
        <div style={{padding:"2rem"}}>
            <Header />
                <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
            <Footer />
        </div>
    )
    const pathName = usePathname()

    function handleResize() {
        setLayout(isMobileFn() ? 
        // mobile view
        <MobileView>
            <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
        </MobileView> : 
        // desktop view
        <div style={{padding:"2rem"}}>
            <Header />
                <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
            <Footer />
        </div>
        )
    }

    useEffect(() => {
        // handleResize() // call once on initial page load
        var debounced = debounce(handleResize, 100)

        // Attach the event listener to the window object
        window.addEventListener('resize', debounced);
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', debounced);
        };
      }, [])
    
    return pathName == "/landing" ? <>{children}</> : layout
}