import "./header.css"
import Navbar from "../navbar/navbar"
import { DesktopLogo } from "../logo/logo"

export default function Header(props: any){

    return (
        <div className="header-container">
          <Navbar />
          <DesktopLogo />
          <div className="logo-buffer" />
          {/* <img src="/assets/cloud cropped.png" className="background-image"/> */}
        </div>
    )
}