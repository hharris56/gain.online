import "./linkBar.css"

interface MusicLinkProps{
    spotify?: string;
    apple?: string;
    youtube?: string;
}

function MusicLinkBar(props: MusicLinkProps){
    return (
        <span className="link-bar">
            {props.spotify &&
            <a className="link-button" href={props.spotify} target="_blank">
                <img src={"/icons/spotify icon.png"} className="link-icon"></img>
                <a style={{marginLeft: "0.5rem"}}>spotify</a>
            </a>}
            {props.apple &&
            <a className="link-button" href={props.apple} target="_blank">
                <img src={"/icons/apple music icon.png"} className="link-icon"></img>
                <a style={{marginLeft: "0.5rem"}}>apple music</a>
            </a>}
        </span>
    )
}

export { MusicLinkBar }