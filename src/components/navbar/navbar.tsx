"use client";

import Link from "next/link";
import "./navbar.css";
import { useRouter } from "next/navigation";

function Navbar(props: any) {
  return (
    <span className="navbar-container">
      <NavbarButton title="audio" route="/audio"></NavbarButton>
      <NavbarButton title="visual" route="/visual"></NavbarButton>
      <NavbarButton title="code" route="/code"></NavbarButton>
      {/* <NavbarButton title="blog" route="/blog"></NavbarButton> */}
    </span>
  );
}

function VerticalNavbar(props: { expanded: boolean }) {
  return (
    <div
      className="vnavbar-container"
      style={{ maxHeight: props.expanded ? "" : "0rem" }}
    >
      <NavbarButton title="home" route="/home"></NavbarButton>
      <NavbarButton title="audio" route="/audio"></NavbarButton>
      <NavbarButton title="visual" route="/visual"></NavbarButton>
      {/* <NavbarButton title="code" route="/code"></NavbarButton> */}
    </div>
  );
}

interface ButtonProps {
  title: string;
  route: string;
  selected?: boolean;
}
function NavbarButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Link className="navbar-button" href={props.route} key={props.title}>
      {props.title}
    </Link>
  );
}

export { Navbar, VerticalNavbar };
