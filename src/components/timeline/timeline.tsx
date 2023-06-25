import "./timeline.css"

export default function Timeline(){
    return(
        <div className="timeline-container">
            <div className="timeline-line" />
            <div className="timeline-content">
                <TimelineItem>some text</TimelineItem>
                <TimelineItem>some text</TimelineItem>
                <TimelineItem>some text</TimelineItem>
                <TimelineItem>some text</TimelineItem>
            </div>
        </div>
    )
}

function TimelineItem(props: any){
    return (
        <div className="timeline-item">{props.children}</div>
    )
}