import Posts from './posts/posts';
import "./home.css";

export default function Home() {

  return (
    <div>
      <h1>gain online</h1>
      <div style={{marginBottom: "2rem"}}>
        hey, welcome to my corner of the web. my name is <mark style={{backgroundColor: "black"}}>u thought</mark> but online i go by gain. im a 25yo artist, programmer, and avid enjoyer of all things related to music and design. check out some of my work above, u can reach me via the contact page or find me on my socials.
      </div>
      <h2 style={{marginBottom: "0rem", textAlign: "center"}}><i>++</i> whats new? <i>++</i></h2>
      <div className="content-container">
        <Posts/>
      </div>
      <img src="/art/mountain - copy.png" style={{width: "100%"}}/>
    </div>
  )
}
