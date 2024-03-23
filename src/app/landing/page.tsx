import "./landing.css";
import { MobileCoverLogo } from '../../components/logo/logo';
import Link from "next/link";

export default function Landing() {

  return (
    <div className="mobile-cover">
      <div className="enter-mantle">
          <a 
          className="default-button enter-button" 
          href="/home"
          // passHref={true}
          >
          enter
          </a>
      </div>
      <MobileCoverLogo />
    </div>
)
}
