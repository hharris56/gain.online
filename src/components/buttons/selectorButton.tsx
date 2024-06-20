"use client"

import "./buttons.css"
import { useIsMobile } from "../../hooks/mobileHooks";

interface SelectorButtonProps{
    selected: boolean;
    onClick: () => void;
    text: string;
    sx?: any;
}

export default function SelectorButton(props: SelectorButtonProps){

    const isMobile = useIsMobile()

    return (
        <div 
            className={"selector-button" + (props.selected ? " sb-selected" : "") + (!isMobile ? " selector-button-hover" : "")}
            style={props.sx}
            onClick={props.onClick}>
            {props.text}
        </div>
    )
}