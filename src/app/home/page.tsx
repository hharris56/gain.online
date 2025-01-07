import Posts from './posts/posts';
import "./home.css";

export default function Home() {

  return (
    <div style={{minWidth: "var(--content-width)"}}>
      <h1>gain online</h1>
      <div style={{marginBottom: "2rem"}}>
        hey, welcome to my corner of the web. my name is <mark style={{backgroundColor: "var(--primary-text-color)", color: "var(--primary-text-color)"}}>u thought</mark> but online i go by gain. im a 26yo artist, programmer, and avid enjoyer of all things related to music and design. check out some of my work, u can reach me via the contact page or find sme on my socials.
      </div>
      {/* <h2 style={{marginBottom: "0rem", textAlign: "center"}}><i>++</i> whats new? <i>++</i></h2> */}
      <div className="home-content-container">
        <Posts/>
      </div>
      <img src="/art/mountain - copy.png" style={{width: "100%", filter: "invert(1)"}}/>
    </div>
  )
}
