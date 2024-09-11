import "./buttons.css"

interface LinkButtonProps{
    link: string
    icon: string
    text?: string
    sx?: any
}
export default function LinkButton(props: LinkButtonProps){
    const icons: { [id: string] : string; } = {
        "spotify": "/icons/spotify icon.png",
        "apple": "/icons/apple music icon.png",
        "soundcloud": "/icons/soundcloud icon.png"
    }
    return (
        <a className="link-button" href={props.link} target="_blank" style={props.sx}>
            <img src={icons[props.icon] ?? props.icon} className="link-icon"></img>
            {props.text && <a style={{marginLeft: "0.5rem"}}>{props.text}</a>}
        </a>
    )
}