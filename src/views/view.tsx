"use client"

import { Inter } from 'next/font/google'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import useWidthBreakPoint from '../hooks/mobileHooks'
import MobileView from './mobileView/mobileView'

const inter = Inter({ subsets: ['latin'] })

export default function View({
    children,
    }: {
    children: React.ReactNode
    }){

    const isMobile: any = useWidthBreakPoint(650)

    const layout: any = isMobile? 
    // mobile view
    (<body className={inter.className}>
        <MobileView>
            <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
        </MobileView>
    </body>) :
    // desktop view
    (<body className={inter.className} style={{padding:"2rem"}}>
        <Header />
            <div style={{marginBottom: "2rem", fontSize: "1.25em"}}>{children}</div>
        <Footer />
    </body>)

    return layout
}