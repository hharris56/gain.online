import "./header.css"
import Navbar from "../navbar/navbar"
import Logo from "../logo/logo"

export default function Header(props: any){
    return (
        <div className="header-container">
          <Logo />
          <div className="logo-buffer" />
          <Navbar />
          {/* <img src="/assets/cloud cropped.png" className="background-image"/> */}
        </div>
    )
}