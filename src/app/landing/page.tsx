import "./landing.css";
import { MobileCoverLogo } from '../../components/logo/logo';
import Link from "next/link";

export default function Landing() {

  return (
    <div className="mobile-cover">
      <div className="enter-mantle">
          <Link 
          className="default-button enter-button" 
          href="/home"
          // passHref={true}
          >
          enter
          </Link>
      </div>
      <MobileCoverLogo />
    </div>
)
}
