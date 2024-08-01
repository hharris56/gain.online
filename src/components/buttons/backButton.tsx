import "./buttons.css"
import Link from "next/link"

interface BackButtonProps{
    route: string
    sx?: any
}
export default function BackButton(props: BackButtonProps){
    return (
        <Link href={props.route} className="back-button" style={{...props.sx}}>
            {/* <a style={{fontSize: "2rem", marginRight: "0.5rem", lineHeight: "2rem"}}>&lt;</a> */}
            <img src="/icons/arrow left.svg" style={{filter: "invert(17%)", width: "2rem"}}/>
            <a>back</a>
        </Link>
    )
}