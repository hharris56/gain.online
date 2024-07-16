import "./buttons.css"
import Link from "next/link"

interface BackButtonProps{
    route: string
}
export default function BackButton(props: BackButtonProps){
    return (
        <Link href={props.route} style={{display: "flex", alignItems: "center", marginBottom: "1rem", float: "left"}}>
            <a style={{fontSize: "2rem", marginRight: "0.5rem", lineHeight: "2rem"}}>&lt;</a>
            <a>back</a>
        </Link>
    )
}