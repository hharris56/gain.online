import "./landing.css";
import { MobileCoverLogo } from '../../components/logo/logo';

export default function Landing() {

  return (
    <div className="mobile-cover">
      <div className="enter-mantle">
          <div 
          className="default-button enter-button" 
          // onClick={() => setCover(false)}
          >
          enter
          </div>
      </div>
      <MobileCoverLogo />
    </div>
)
}
