"use client"
import { useIsMobile } from "../../../hooks/mobileHooks"
import { MusicLinkBar } from "../../../components/linkBar/linkBar"
import "../audio.css"
import BackButton from "../../../components/buttons/backButton"

export default function DeeperStill(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#65b53a");
    document.documentElement.style.setProperty("--primary-text-color", "#65b53a");
    document.documentElement.style.setProperty("--secondary-text-color", "white"); //"#65cce6"

    // #65b53a

    return (
        <div className={"album-page-container" + (isMobile ? " album-page-mobile" : "")}>
            {/* <BackButton route="/audio" /> */}
            {isMobile && <img 
                src={"/art/albums/deeper still/deeper still album cover.png"} 
                className="album-image"
                style={{width: "75vw"}}
            />}
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/deeper still/deeper still album cover.png"} 
                    className="album-page-image"
                />}
                <div className="album-page-text" style={{padding: isMobile ? "0rem" : ""}}>
                    <div style={{fontSize: "2rem", fontWeight: "bold", textAlign: "center"}}>deeper still</div>
                    <a style={{color: "var(--secondary-text-color)", textAlign: "center"}}>4 may 2024</a>
                    <MusicLinkBar links={{
                        spotify: "https://open.spotify.com/album/6ZCRMvZuJDAwfEvn8KXqta?si=uJmt1xSGTCa6mOUY7JrmYA",
                        apple: "https://music.apple.com/us/album/deeper-still-ep/1744920440"
                    }}
                    sx={{margin: "2rem 0rem"}}
                    />
                    <a style={{color: "var(--secondary-text-color)"}}>In the year 2103 a massive network of subterranean passageways were discovered in the Chilean mountains. Decades of exploration have left humanity with more questions than answers and much of the network remains uncharted. The year is now 2189 and the United Global Front's 22nd subterranean expedition ventures deeper still.</a>
                </div>
            </div>
            <div className="album-page-row">
                <div className="album-page-text" style={{padding: isMobile ? "0rem" : ""}}>
                    <h2 style={{marginTop: "0rem"}}><i>deeper still</i></h2>
                    <a style={{color: "var(--secondary-text-color)"}}>As our expedition party sets out there is a communal sense of excitement about the impending journey. One by we descend into the earth, slipping through cracks and squeezing through holes. Our headlamps illuminate path markers painted on the surrounding walls along with graphics, signatures and tags of those who came before us. Countless hours and millions of dollars have been spent preparing us for this journey. On our backs we carry not only the most advanced surveying equipment available, but also the hopes of our respective nations. The dreams and fears, speculations and doubts, all hinge on our success exploring deeper than ever before.</a>
                </div>
                {!isMobile && <img 
                    src={"/art/albums/deeper still/deeper still cover.jpg"} 
                    className="album-page-image"
                />}
            </div>
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/deeper still/metric ton cover.jpg"} 
                    className="album-page-image"
                />}
                <div className="album-page-text" style={{padding: isMobile ? "0rem" : ""}}>
                    <h2 style={{marginTop: "0rem"}}><i>metric ton</i></h2>
                    <a style={{color: "var(--secondary-text-color)"}}>The deep earth sensor array beeps and whirs as we descend further into the cavern. Little lights blink to indicate measurements have been relayed back up the signalway to researches on the surface. We past the third encampment a few days ago, a facility that serves as a jumping off point for many of the UGF’s expeditions and also marks the last man made structure on our route through the cave network. From here on out we will be in the dark, figuratively speaking, requiring one of us to find the nearest relay tower if we want to send or receive comms. Spirits are high among our party, although the last few days have been quiet as we trek ever deeper, engrossed in our expedition.</a>
                </div>
            </div>
            <div className="album-page-row">
                <div className="album-page-text" style={{padding: isMobile ? "0rem" : ""}}>
                    <h2 style={{marginTop: "0rem"}}><i>fleeting shadows</i></h2>
                    <a style={{color: "var(--secondary-text-color)"}}>Our supplies, 2 weeks worth of nutrition for the entire party, ran out days ago. Strangely enough none of the remaining members still traveling with me feel hungry or show any signs of fatigue. Even sleep has become entirely optional as most of us just lie wide awake, unable to rest our minds. There’s someone or something calling to us - to me specifically - from ahead, always seemingly just a chamber away. While this journey drives further into the unknown I find myself wondering if we’re still descending for our mission or if there’s something within ourselves emerging, some innate or primal curiosity that keeps pushing us deeper.</a>
                </div>
                {!isMobile && <img 
                    src={"/art/albums/deeper still/fleeting shadows cover.jpg"} 
                    className="album-page-image"
                />}
            </div>
            <div className="album-page-row">
                {!isMobile && <img 
                    src={"/art/albums/deeper still/one in a million cover.jpg"} 
                    className="album-page-image"
                />}
                <div className="album-page-text" style={{padding: isMobile ? "0rem" : ""}}>
                    <h2 style={{marginTop: "0rem"}}><i>one in a million</i></h2>
                    <a style={{color: "var(--secondary-text-color)"}}>I don’t know what lies at the end of this, or even if there is an end. The narrow passageways we once squeezed through have opened into cathedrals of staggering height. My boots have worn to pieces, and my memories from before this journey feel as distant as a past life, yet I feel nothing but the drive to keep moving forward. I left my tac-pack ages ago, a twisted amalgamation of sensors and dials naively attempting to understand the incomprehensible. There is no purpose for such tools in this temple, whatever pulls me in cannot be measured or recorded, only experienced. After everything I leave you with this final entry. I hope what’s left of my records can make it back to the surface, but my calling lies deeper still.</a>
                </div>
            </div>
        </div>
    )
}