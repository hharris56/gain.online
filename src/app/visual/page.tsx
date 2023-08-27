'use client';

import { useState } from 'react';
import './visual.css'


export default function VisualPage(){
    return (
        <div>
            <h1>gain design</h1>
            <a>some visual art projects and explorations from over the years. different eras use different approaches, tools, and ideologies.</a>
            <Timeline />
        </div>
    )
}

function Timeline(){
    return(
        <div className="content-container">
            <StarCharts/>
            <AccretionDepartment/>
            {/* <TimelineItem>compound abyss</TimelineItem>
            <TimelineItem>early work</TimelineItem> */}
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

    var [expanded, setExpanded] = useState(false);
    var itemGallery = (
        <div className="item-gallery">
            {props.pictures.map(pic => {
                return (
                    <img key={pic} className="image" src={`/visual/${pic}`}/>
                )
            })}
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
                <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                    <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/>
                </div>
                <div className="post-divider"/>
            </div>
        </div>
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
            near the end of the accretion department series i decided to take a step back from that study. one thing that did carry over was the idea of low time investment. this series was intended to reflect the wonder that astronomy held when i was a child and the rigidty that physics brought it during high school. it was rather short lived with the fourth and final piece not even making it to release, but i am proud of how cohesive the whole study feels.
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