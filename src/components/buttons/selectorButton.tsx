import "./buttons.css"

interface SelectorButtonProps{
    selected: boolean;
    onClick: () => void;
    text: string;
    sx?: any;
}

export default function SelectorButton(props: SelectorButtonProps){

    return (
        <div 
            className={"selector-button" + (props.selected ? " sb-selected" : "")}
            style={props.sx}
            onClick={props.onClick}>
            {props.text}
        </div>
    )
}