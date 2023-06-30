import Image from 'next/image';
import styles from './page.module.css';
import checkDevice from '../check-device';
import "./landing.css";

export default function Landing() {

  const deviceInfo = checkDevice();

  return (
    <div>
      <h1>gain online</h1>
      <div>
        hey, welcome to my corner of the web. my name is <mark style={{backgroundColor: "black"}}>u really thought</mark> but online i go by gain. im a 24yo artist, programmer, and avid enjoyer of all things related to music and design. check out some of my work above, u can reach me via the contact page or find me on my socials.
      </div>
      <img src="/visual/mountain - copy.png" style={{width: "100%"}}/>
    </div>
  )
}
