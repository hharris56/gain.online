"use client"

import "./buttons.css"
import { desktopClass } from "../../hooks/mobileHooks";

interface SelectorButtonProps{
    selected: boolean;
    onClick: () => void;
    text: string;
    sx?: any;
}

export default function SelectorButton(props: SelectorButtonProps){

    return (
        <div 
            className={"selector-button" + (props.selected ? " sb-selected" : "") + desktopClass("selector-button-hover")}
            style={props.sx}
            onClick={props.onClick}>
            {props.text}
        </div>
    )
}