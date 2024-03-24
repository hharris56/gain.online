import "./buttons.css"

export default function DropDownButton(props: {expanded: boolean, callback: () => void}){
    return (
        <img src="/logos/logo black.png" className="dropdown-button"
                style={{rotate: props.expanded? "45deg" : "0deg"}}
                onClick={props.callback}/>
    )
}