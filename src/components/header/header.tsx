import "./header.css"
import Navbar from "../navbar/navbar"
import Link from "next/link"
import Logo from "../logo/logo"

export default function Header(){
    return (
        <div className="header-container">
          {/* <Link className="logo-container" href="/landing">
            <img className="logo" src="/logo black.png" />
          </Link> */}
          <Logo />
          <div className="logo-buffer" />
          <Navbar />
        </div>
    )
}