import { twMerge } from "tailwind-merge";
import "./buttons.css";

interface DropdownButtonProps {
  expanded: boolean;
  callback: () => void;
  size?: string;
  color?: string;
  sx?: string;
}

export default function DropdownButton(props: DropdownButtonProps) {
  const logoString = `/logos/logo ${props.color ?? "black"}.png`;
  return (
    <img
      src={logoString}
      className={twMerge("dropdown-button", props.sx)}
      style={{
        rotate: props.expanded ? "45deg" : "0deg",
        width: props.size ?? "",
        height: props.size ?? "",
      }}
      onClick={props.callback}
    />
  );
}
