"use client";

import "../audio.css";
import { useIsMobile } from "../../../hooks/mobileHooks";
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage";
import FlightBoard from "../../../components/flightBoard/flightBoard";
import { PropsWithChildren, useLayoutEffect } from "react";

export default function Overseas() {
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--primary-color", "black");
    // document.documentElement.style.setProperty("--accent-color", "#5489d8");
    document.documentElement.style.setProperty("--primary-text-color", "white");
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      "#f05db0",
    );
  }, []);

  const boardRows = [
    "time    destination       gate   status   ",
    "05:12   copenhagen        c14    departed ",
    "04:56   100cc             a02    gate open",
    "03:56   barsbuttel step   a11    departed ",
    "02:55   vitamin pushh     b07    on-time  ",
    "05:20   action            b33    on-time  ",
    "02:04   march interlude   ---    ---------",
    "05:33   binary sky        a10    departed ",
    "05:06   true virtue       c02    gate open",
    "02:51   chariot           b23    boarding ",
    "04:57   sunwalker         b19    on-time  ",
    "08:03   eastern front     c16    on-time  ",
    // "                 overseas                 "
  ];

  // const cityMap = [
  //     "copenhagen       :     copenhagen",
  //     "100cc            :      amsterdam",
  //     "barsbuttel step  :        hamburg",
  //     "vitamin pushh    :         berlin",
  //     "action           :         munich",
  //     "march interlude  :         prauge",
  //     "binary sky       :       budapest",
  //     "true virtue      :         warsaw",
  //     "chariot          :      stockholm",
  //     "sunwalker        :  st petersburg",
  //     "eastern front    :         moscow",
  //     // "                 overseas                 "
  // ]

  return (
    <>
      <DefaultAudioPage
        title="overseas"
        date="10 january 2024"
        cover="/art/albums/overseas/overseas cover.jpg"
        links={{
          spotify:
            "https://open.spotify.com/album/6EHllJmgFCdGQoR9yV3fD4?si=y4WqHILAQeSkq7DA5SWj7g",
          apple: "https://music.apple.com/us/album/overseas/1788945323",
        }}
        description="the pursuit of desire comes at a price... one night overseas can change everything"
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <FlightBoard rows={boardRows} sx={{ margin: "2rem 0rem" }} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ maxWidth: "50rem" }}>
          <h2 style={{ width: "100%", textAlign: "center" }}>abstract</h2>
          <p>
            inspired by the bleak landscapes and brutalist architecture of
            central and eastern europe, 'overseas' explores the spiritual and
            emotional burdens that arise from the pursuit of pleasure, and
            recount the events of an unknown protaganist during a single night
            overseas.
          </p>
          <p>
            the desolate soundscapes and droning pads are punctuated by lush
            arpeggios and driving basslines to create a wave of sound and
            emotion that rush past, leaving only traces of some featureless
            longing in their wake.
          </p>
          {/* <p>a blanket of droning pads punctuated by lush arpeggios and driving basslines coalesce into a sea of sound and emotion, while crunchy percussion and massive kicks rush past leaving only traces of some featureless longing in their wake.</p> */}
          <p>+ gain</p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ width: "100%", textAlign: "center" }}>
          influences + inspiration
        </h2>

        {/* <div style={{display: "flex", flexDirection: !isMobile ? "row" : "column", alignItems: "center", justifyContent: "center", backgroundColor: "green"}}>
                    <img src="/assets/aleph cover.jpg" style={{width: "10rem", marginRight: !isMobile ? "2rem" : "0rem"}} />
                    <div style={{display: "flex", flexDirection: "column", maxWidth: "40rem", textAlign: "center"}}>
                        <h3><u>aleph</u> by paulo coelho</h3>
                        <p>a fixating novel by my current favorite author, this book follows paulo as he embarks on a train journy across russia. i really loved the idea of this trans-continental voyage and it definitely played a part in setting the story for this album.</p>
                    </div>
                </div> */}

        <Influence
          title="spots: a research piece on modern street skating"
          author="place magazine"
          body="awesome video by the team over at place mag. i loved the narrators tone and subject material, she ended up being the voice of copenhagen."
        >
          <iframe
            src="https://www.youtube.com/embed/N9oY7I720vw?si=SvBxsBgBczvjz22Z"
            style={{ width: "20rem", marginRight: !isMobile ? "2rem" : "0rem" }}
          />
        </Influence>
        <Influence
          title="k2 calling"
          author="mike horn"
          body="a beautiful piece by mike horn covering difficulties and his experience climbing k2. he is the vocal samples used on binary sky. 'we lived uh, moments very close to death together'"
        >
          <iframe
            src="https://www.youtube.com/embed/mYV0moSe8Co?si=xonNOJZmAwRsCycf"
            style={{ width: "20rem", marginRight: !isMobile ? "2rem" : "0rem" }}
          />
        </Influence>
        <Influence
          title="aleph"
          author="paulo coelho"
          body="a fixating novel by my current favorite author, this book follows paulo as he embarks on a train journy across russia. i really loved the idea of this trans-continental voyage and it definitely played a part in setting the story for this album."
        >
          <img
            src="/assets/aleph cover.jpg"
            style={{ width: "10rem", marginRight: !isMobile ? "2rem" : "0rem" }}
          />
        </Influence>
      </div>
      {/* <div style={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                <div style={{maxWidth: "50rem"}}>
                    <h2 style={{width: "100%", textAlign: "center"}}>acknowledgements</h2>
                    <p>none of my music would be possible without the support of my friends + family, but there are a few people in particular i'd like to shout out for this album.</p>
                    <p><b>my partner</b> - the voice behind 'sound seeker' and many other tags; she is also a huge source of inspiration for the album's narrative theme.</p>
                    <p><b>noPress</b> - my oldest collaborator and most trusted advisor. he provided invaluable input on nearly every track including suggestions, references and critiques prior to release.</p>
                    <p><b>hunter</b> - a dear friend with a great suggestion. he named the track '100cc' and in doin so unintentionally shifted the whole theme the album.</p>
                </div>
            </div> */}
    </>
  );
}

interface InfluenceProps {
  title: string;
  author: string;
  body: string;
}
const Influence = (props: PropsWithChildren<InfluenceProps>) => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: !isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "2rem",
        maxWidth: "50rem",
      }}
    >
      {props.children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "0.25rem" }}>{props.title}</h3>
        <i>{props.author}</i>
        <p style={{ textAlign: "left" }}>{props.body}</p>
      </div>
    </div>
  );
};
