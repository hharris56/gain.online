"use client"

import "../audio.css"
import { useIsMobile } from "../../../hooks/mobileHooks"
import DefaultAudioPage from "../../../components/defaultAudioPage/defaultAudioPage"

export default function BarsbuttelStep(){
    const isMobile = useIsMobile()

    document.documentElement.style.setProperty("--primary-color", "black");
    document.documentElement.style.setProperty("--accent-color", "#7823c0");
    document.documentElement.style.setProperty("--primary-text-color", "#0bb774");
    document.documentElement.style.setProperty("--secondary-text-color", "#f043be");
 
    return (
        <div>
            <DefaultAudioPage
                title="binary sky"
                date="2 august 2024"
                cover="/art/albums/binary sky/binary sky cover.jpg"
                links={{
                    spotify: "https://open.spotify.com/album/0hvk7wFYTcV4DndMn79X24?si=xUuXK6gqTUCwWha905ja7g",
                    apple: ""
                }}
                description="sometimes diving in blind is the only way to see the other side."
            />
        </div>
    )
}