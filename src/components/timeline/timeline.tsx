import "./timeline.css"

export default function Timeline(){
    return(
        <div className="timeline-container">
            {/* <div className="timeline-line" /> */}
            <div className="timeline-content">
                <StarCharts />
                <TimelineItem>accreation department</TimelineItem>
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

    return(
        <div className="timeline-item">
            <div style={{marginBottom: "1em"}}>
                <h3 style={{marginBottom: "0em"}}>star charts </h3>
                <a style={{color: "grey", fontSize: "0.75em"}}>2021</a>
            </div>
            <a style={{maxWidth: "100rem"}}>after falling off with the accreation department series i decided to take a step back from the chaos of that study. one thing that did carry over was the idea of low time investment. this series was intended to reflect the wonder that astronomy held when i was a child and the rigidty that physics brought it during high school. it was rather short lived with the fourth and final piece not even making it to release, but i am proud of how cohesive the whole study feels.</a>
            <div className="item-gallery">
                <img className="image" src="/visual/elevation.png" />
                <img className="image" src="/visual/momentum.png" />
                <img className="image" src="/visual/optics.png" />
                <img className="image" src="/visual/magnetism.png" />
            </div>
        </div>
    )
}