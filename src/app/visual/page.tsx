'use client';

import { useState } from 'react';
import './visual.css'
import { Rowdies } from 'next/font/google';


export default function VisualPage(){
    return (
        <div>
            <h1>gain design</h1>
            <a>some visual art projects and explorations from over the years. different eras use different approaches, tools, and ideologies.</a>
            <div className="content-container">
                <Cars/>
                <CloudStudy1/>
                <StarCharts/>
                <AccretionDepartment/>
            </div>
        </div>
    )
}

interface TimelineProps {
    title: string;
    date: string;
    children: any;
    pictures: string[];
}
function TimelineItem(props: TimelineProps){

    var [expanded, setExpanded] = useState(true);
    var galleryContent = props.pictures.map((pic: string) => {
        return (
            // <img key={pic} className="image" src={`/visual/${pic}`}/>
            <GalleryImage imgName={pic}></GalleryImage>
        )
    });
    var itemGallery = (
        <div className="item-gallery">
            <div className='item-gallery-content'>
                {galleryContent}
            </div>
        </div>
    )

    return (
        <div style={{display: "flex", flexDirection: "row"}} className="post-container">
            <div className="line-decoration" />
            <div className="timeline-item">
                <div style={{marginBottom: "1em"}}>
                    <h2 style={{marginBottom: "0em", marginTop: "0rem"}}>{props.title}</h2>
                    <a style={{color: "grey", fontSize: "0.75em"}}>{props.date}</a>
                </div>
                <a style={{paddingRight: "3rem"}}>{props.children}</a>
                {
                    expanded? itemGallery : <></>
                }
                {/* <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                    <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/>
                </div> */}
            </div>
        </div>
    )
}
interface GalleryProps{
    imgName: string
}
function GalleryImage(props: GalleryProps){
    return (
        <div className="gallery-item">
            <img key={props.imgName} className="image" src={`/art/${props.imgName}`}/>
            <div className="image-info-card">
                this card certifies that the artist, gain, declares the accompanying piece of
                artwork to be authentic, original, and a unique piece of his own creative efforts.
            </div>
        </div>
    )
}

function Cars(){
    const pictures = [
        "./cars/f150.jpg",
        "./cars/saab.jpg",
        "./cars/gti.jpg",
    ]

    return (
        <TimelineItem title="cars!" date="2024" pictures={pictures}>
            hand drawn on procreate. my linework is still shaky but this study is helping a lot. i wanted
            to capture the <i>essence</i> of the vehicles and worry less about exact proportions. love the
            way these have been looking so far and they make for great weekly sketches as i can usually knock
            one out in like 30min to an hour. if you want your car drawn send me a reference photo.
        </TimelineItem>
    )
}

function CloudStudy1(){
    const pictures = [
        "./clouds/cloud study 7.jpg",
        "./clouds/cloud study 6.jpg",
        "./clouds/cloud study 5.jpg",
        "./clouds/cloud study 4.jpg",
        "./clouds/cloud study 3.jpg",
        "./clouds/cloud study 2.jpg",
        "./clouds/cloud study 1.jpg"
    ]

    return (
        <TimelineItem title="cloud study one" date="2023" pictures={pictures}>
            my first study once i got an ipad. part form study, part procreate exploration, this
            mini project was mostly for fun but i learned a lot in the process. not only did the 
            loose nature of clouds make it easy for the final product to "look good", it also 
            let me focus more on practicing fundamentals of drawing and not get stressed out when
            a shape or line was too difficult.
        </TimelineItem>
    )
}

function StarCharts(){
    const pictures = [
        "elevation.png",
        "momentum.png",
        "optics.png",
        "magnetism.png"
    ]

    return (
        <TimelineItem title="star charts" date="2021" pictures={pictures}>
            near the end of the accretion department series i decided to take a step back from that study. one thing that did carry over was the idea of low time investment. this series was intended to reflect the wonder that astronomy held when i was a child and the rigidity that physics brought it during high school. it was rather short lived with the fifth and final piece not even making it to release, but i am proud of how cohesive the whole study feels.
        </TimelineItem>
    )
}

function AccretionDepartment(){
    const pictures = [
        "human condition.png",
        "lazarus awoke.png",
        "5 nights in the city that never sleeps.png",
        "sterile.jpg",
        "the sound of living.png",
        "future reflections.jpg",
        "when did the sky get so far away.jpg",
        "ill advised transport.jpg",
        "self portrait 1.png",
        "media life.png",
        "virtual ghost.png",
        "directory management.jpg",
        "scan away our sins.jpg",
        "leave me here.jpg",
        "sunrise.png",
        "depth and distance.jpg",
        "the places were told not to go.png",
        "i liked it better inside.jpg",
        "a chance encounter.png",
        "one for the books.jpg",
        "smoking kills.jpg",
        "its not getting any easier.jpg",
        "aerodynamic lies.jpg",
        "allstar.png",
        "take me there.jpg",
        "genesis.jpg"
    ];

    return (
        <TimelineItem title="accretion department" date="2021" pictures={pictures}>
            my longest lasting study, the accretion department was a direct reaction to the drawn out ending of compound abyss. my idea going into the study was to heavily prioritize quantity over quality and spend as little time as possible second guessing decisions or direction. embracing imperfection allowed for a higher output and in turn more opportunities to catch that spark of inspiration... it really was the epitome of throwing everything at the wall and seeing what worked. at the time i was feeling very stuck in a routine, both creatively and in general so i guess spending 15 minutes a day designing whatever was on my mind provided a much needed change of pace. the accretion department is where the name gain originated, and it also prompted the creation of my current twitter account.
        </TimelineItem>
    )
}