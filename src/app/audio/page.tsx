import "./audio.css"
import Link from "next/link"

export default function AudioPage(){

    return (
        <div>
            <h1>gain audio</h1>
            <a>it all starts here</a>
            <div className="albums-container">
                <Album
                    cover="/art/albums/Commuter cover final.png"
                    title="commuter"
                    year={2024}
                />
            </div>
        </div>
    )
}

function Album(props: {cover: string, title: string, year: number}){
    const href = `/audio/${props.title}`
    return (
        <div className="album-item">
            <Link href={href}>
                <img src={props.cover} style={{maxWidth: "100%"}}/>
            </Link>
            <div className="album-info">
                <i style={{fontSize: "2rem"}}>{props.title}</i>
                <a style={{fontSize: ".75rem"}}>{props.year}</a>
            </div>
        </div>
    )
}