import { twMerge } from "tailwind-merge";
import "./buttons.css";

interface DropdownButtonProps {
  expanded: boolean;
  onClick: () => void;
  size?: string;
  color?: string;
  className?: string;
}

export default function DropdownButton({
  expanded,
  onClick,
  size,
  color,
  className,
}: DropdownButtonProps) {
  const logoString = `/logos/logo ${color ?? "black"}.png`;
  return (
    <img
      src={logoString}
      className={twMerge("dropdown-button", className)}
      style={{
        rotate: expanded ? "45deg" : "0deg",
        width: size ?? "",
        height: size ?? "",
      }}
      onClick={onClick}
    />
  );
}
