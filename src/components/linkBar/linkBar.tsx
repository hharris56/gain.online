import "./linkBar.css"

interface MusicLinkProps{
    links: any;
    sx?: any;
}

function MusicLinkBar(props: MusicLinkProps){
    return (
        <span className="link-bar" style={props.sx}>
            {props.links.spotify &&
            <a className="link-button" href={props.links.spotify} target="_blank">
                <img src={"/icons/spotify icon.png"} className="link-icon"></img>
                <a style={{marginLeft: "0.5rem"}}>spotify</a>
            </a>}
            {props.links.apple &&
            <a className="link-button" href={props.links.apple} target="_blank">
                <img src={"/icons/apple music icon.png"} className="link-icon"></img>
                <a style={{marginLeft: "0.5rem"}}>apple music</a>
            </a>}
            {props.links.soundcloud &&
            <a className="link-button" href={props.links.soundcloud} target="_blank">
                <img src={"/icons/soundcloud icon.png"} className="link-icon"></img>
                <a style={{marginLeft: "0.5rem"}}>soundcloud</a>
            </a>}
        </span>
    )
}

export { MusicLinkBar }