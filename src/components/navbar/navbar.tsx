import Link from "next/link";
import "./navbar.css";
// import { useRouter } from "next/router";

export default function Navbar(){
    return (
        <span className="navbar-container">
            <NavbarButton title="audio" route="/audio"></NavbarButton>
            <NavbarButton title="visual" route="/visual"></NavbarButton>
            <NavbarButton title="code" route="/code"></NavbarButton>
        </span>
    )
}

interface ButtonProps{
    title: string,
    route: string
}
function NavbarButton(props: ButtonProps){

    // const _router = useRouter();

    return (
        // <div className="navbar-button" onClick={() => _router.push(props.route)}>{props.title}</div>
        <Link className="navbar-button" href={props.route}>{props.title}</Link>
    )
}