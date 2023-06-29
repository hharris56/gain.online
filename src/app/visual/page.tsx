'use client';

import { useState } from 'react';
import './visual.css'
// import Timeline from '../../components/timeline/timeline'


export default function VisualPage(){
    return (
        <div className='page-contianer'>
            <h1>gain design</h1>
            <a>some visual art projects and explorations from over the years. different eras use differet approaches, toolsets and ideologies.</a>
            <Timeline />
        </div>
    )
}

function Timeline(){
    return(
        <div className="timeline-container">
            {/* <div className="timeline-line" /> */}
            <div className="timeline-content">
                <StarCharts />
                <AccreationDepartment />
                <TimelineItem>compound abyss</TimelineItem>
                <TimelineItem>early work</TimelineItem>
            </div>
        </div>
    )
}

function TimelineItem(props: any){
    return (
        <div className="timeline-item">{props.children}</div>
    )
}

function StarCharts(){

    const pictures = [
        "elevation.png",
        "momentum.png",
        "optics.png",
        "magnetism.png"
    ]

    var [expanded, setExpanded] = useState(false);
    var itemGallery = (
        <div className="item-gallery">
            {pictures.map(pic => {
                return (
                    <img className="image" src={`/visual/${pic}`}/>
                )
            })}
        </div>
    )

    return(
        <div className="timeline-item">
            <div style={{marginBottom: "1em"}}>
                <h3 style={{marginBottom: "0em"}}>star charts</h3>
                <a style={{color: "grey", fontSize: "0.75em"}}>2021</a>
            </div>
            <a style={{paddingRight: "3rem"}}>near the end of the accreation department series i decided to take a step back from that study. one thing that did carry over was the idea of low time investment. this series was intended to reflect the wonder that astronomy held when i was a child and the rigidty that physics brought it during high school. it was rather short lived with the fourth and final piece not even making it to release, but i am proud of how cohesive the whole study feels.</a>
            {
                expanded? itemGallery : <></>
            }
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/>
            </div>
        </div>
    )
}

function AccreationDepartment(){

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

    var [expanded, setExpanded] = useState(false);
    var itemGallery = (
        <div className="item-gallery">
            {pictures.map(pic => {
                return (
                    <img className="image" src={`/visual/${pic}`}/>
                )
            })}
        </div>
    )

    return(
        <div className="timeline-item">
            <div style={{marginBottom: "1em"}}>
                <h3 style={{marginBottom: "0em"}}>accreation department</h3>
                <a style={{color: "grey", fontSize: "0.75em"}}>2021</a>
            </div>
            <a style={{paddingRight: "3rem"}}>my longest lasting study, the accreation department was a direct rejection of everything learned from compound abyss. the idea was to heavily prioritize quantity over quality and spend as little time as possible second guessing decisions or direction. embracing imperfection allowed for a higher output and in turn more opportunities to catch that spark of inspiration... it really was the epitome of thowing everything at the wall and seeing what worked. at the time i was feeling very stuck in a routine, both creatively and in general so i guess spending 15 minutes a day designing whatever was on my mind provided a much needed change of pace. the accreation department is where the name gain originated, and it also prompted the creation of my current twitter account.</a>
            {
                expanded? itemGallery : <></>
            }
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/>
            </div>
        </div>
    )
}