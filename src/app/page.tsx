import "./landing.css";
import { MobileCoverLogo } from '../components/logo/logo';
import Link from "next/link";

export default function Landing() {

  return (
    <div className="mobile-cover">
      {/* <div className="enter-mantle"> */}
          <Link 
          className="expand-button enter-button" 
          href="/home"
          style={{height: "4rem", width: "40%"}}
          // passHref={true}
          >
          enter
          </Link>
      {/* </div> */}
      <MobileCoverLogo />
    </div>
)
}
