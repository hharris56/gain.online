"use client"
import { Break } from "../../../components/blog/blog"
import { useIsMobile } from "../../../hooks/mobileHooks"
import "../audio.css"

export default function DeeperStill(){
    const isMobile = useIsMobile()

    return (
        <div className="album-page-container">
            <div className="album-page-row">
                <img 
                    src={"/art/albums/deeper still/deeper still album cover.png"} 
                    className="album-image"
                    style={{width: "33vw"}}
                />
                <div className="album-page-text">In the year 2103 a massive network of subterranean passageways were discovered in the Chilean mountains. Decades of exploration have left humanity with more questions than answers and much of the network remains uncharted. The year is now 2189 and the United Global Front's 22nd subterranean expedition stretches further into the unknown than ever before.</div>
            </div>
            <div className="album-page-row">
                <div className="album-page-text">As our expedition party sets out there is a communal sense of excitement about the impending journey. One by we descend into the earth, slipping through cracks and squeezing through holes. Our headlamps illuminate path markers painted on the surrounding walls along with graphics, signatures and tags of those who came before us. Countless hours and millions of dollars have been spent preparing us for this journey. On our backs we carry not only the most advanced surveying equipment available, but also the hopes of our respective nations. The dreams and fears, speculations and doubts, all hinge on our success exploring deeper than ever before.</div>
                <img 
                    src={"/art/albums/deeper still/deeper still cover.jpg"} 
                    className="album-image"
                    style={{width: "33vw"}}
                />
            </div>
        </div>
    )
}