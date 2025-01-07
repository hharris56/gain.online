'use client';

import { useState } from 'react';
import './visual.css'
import { ArtMasterList } from '../../models/artMasterList';
import { Gallery } from '../../components/gallery/gallery';
import { useIsMobile } from '../../hooks/mobileHooks';
import ExpandButton from '../../components/buttons/expandButton';
import DropdownButton from '../../components/buttons/dropdownButton';

export default function VisualPage(){
    return (
        <div>
            <h1>gain design</h1>
            <a>private gallery for some of my visual art projects and explorations over the years. different eras use different approaches, tools, and ideologies.</a>
            <div style={{width: "100%", marginTop: "2rem"}}>
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

    var [expanded, setExpanded] = useState(false);
    var itemGallery = <Gallery collectionName={props.title} images={props.pictures}/>

    const isMobile = useIsMobile()

    // TODO: smooth open

    var layout = isMobile?
    ( // mobile view
        <div className="post-container">
            <div className="line-decoration-mobile" />
            <div className="timeline-item">
                <div className="timeline-mobile-header">
                    <div>
                        <h2 style={{marginBottom: "0em", marginTop: "0rem"}}>{props.title}</h2>
                        <a style={{color: "var(--secondary-text-color)", fontSize: "0.75em"}}>{props.date}</a>
                    </div>
                    <DropdownButton 
                    expanded={expanded} 
                    callback={() => setExpanded(!expanded)}
                    size="1rem"
                    color="blue"/>
                </div>
                {expanded ?
                <>
                    <a style={{marginTop: "1rem", paddingRight: "2rem"}}>
                        {props.children}
                    </a>
                    {itemGallery}
                    <div className='scroll-prompt'>
                        <a>&lt;&lt;</a>
                        <div className="scroll-prompt-spacer"></div>
                        <a>&gt;&gt;</a>
                    </div>
                </> : <></>}
            </div>
        </div>
    ) :
    ( // desktop view
        <div style={{display: "flex", flexDirection: "row"}} className="post-container">
            <div className="line-decoration"/>
            <div className="timeline-item">
                <div style={{marginBottom: "1em"}}>
                    <h2 style={{marginBottom: "0em", marginTop: "0rem"}}>{props.title}</h2>
                    <a style={{color: "var(--secondary-text-color)", fontSize: "0.75em"}}>{props.date}</a>
                </div>
                <a style={{paddingRight: "3rem"}}>{props.children}</a>
                {itemGallery}
            </div>
        </div>
    )

    return layout
}

function Cars(){
    const collectionName = "cars!"
    const pictures = ArtMasterList[collectionName]

    return (
        <TimelineItem title={collectionName} date="2024" pictures={pictures}>
            hand drawn on procreate. my linework is shaky but this study is helping a lot. i wanted to capture the <i>essence</i> of the vehicles and worry less about exact proportions. love the way these have been looking so far and they make for great weekly sketches as i can usually knock one out in like 30min to an hour. if you want your car drawn send me a reference photo.
        </TimelineItem>
    )
}

function CloudStudy1(){
    const collectionName = "cloud study one"
    const pictures = ArtMasterList[collectionName]

    return (
        <TimelineItem title={collectionName} date="2023" pictures={pictures}>
            my first works after getting an ipad. part form study, part procreate exploration, this mini project was mostly for fun but i learned a lot in the process. not only did the loose nature of clouds make it easy for the final product to "look good", it also let me focus more on practicing fundamentals of drawing and not get stressed out when a shape or line was too difficult.
        </TimelineItem>
    )
}

function StarCharts(){
    const collectionName = "star charts"
    const pictures = ArtMasterList[collectionName]

    return (
        <TimelineItem title={collectionName} date="2021" pictures={pictures}>
            near the end of the accretion department series i decided to take a step back from that study. one thing that did carry over was the idea of low time investment. this series was intended to reflect the wonder that astronomy held when i was a child and the rigidity that physics brought it during high school. it was rather short lived with the fifth and final piece not even making it to release, but i am proud of how cohesive the whole study feels.
        </TimelineItem>
    )
}

function AccretionDepartment(){
    const collectionName = "accretion department"
    const pictures = ArtMasterList[collectionName]

    return (
        <TimelineItem title={collectionName} date="2021" pictures={pictures}>
            my longest lasting study, the accretion department was a direct reaction to the drawn out ending of compound abyss. my idea going into the study was to heavily prioritize quantity over quality and spend as little time as possible second guessing decisions or direction. embracing imperfection allowed for a higher output and in turn more opportunities to catch that spark of inspiration... it really was the epitome of throwing everything at the wall and seeing what worked. at the time i was feeling very stuck in a routine, both creatively and in general so i guess spending 15 minutes a day designing whatever was on my mind provided a much needed change of pace. the accretion department is where the name gain originated, and it also prompted the creation of my current twitter account.
        </TimelineItem>
    )
}