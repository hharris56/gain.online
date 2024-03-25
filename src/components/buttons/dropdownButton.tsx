import "./buttons.css"

interface DropdownButtonProps {
    expanded: boolean
    callback: () => void
    size?: string
    color?: string
}

export default function DropdownButton(props: DropdownButtonProps){
    const logoString = `/logos/logo ${props.color ?? 'black'}.png`
    return (
        <img src={logoString}  
            className="dropdown-button"
            style={{rotate: props.expanded? "45deg" : "0deg", width: props.size ?? "", height: props.size ?? ""}}
            onClick={props.callback}
        />
    )
}