"use client"

import "./me.css"
import LinkButton from "../../components/buttons/linkButton"

export default function Me(){
    return (
        <div className="linktree-container">
            <img src="/assets/gain pfp.jpg" className="linktree-pfp"/>
            <h1><i>gain online</i></h1>
            <a>bay area electronic artist</a>
            <a>tech + ambient house / jungle + breakcore</a>
            <LinkButton icon="spotify" text="spotify" class="linktree-button" sx={{marginTop: "2rem"}} link="https://open.spotify.com/artist/4mkEgOb3c1imuAXwyeSHug?si=m56OVxS3RmiYkxbTXbws4A"/>
            <LinkButton icon="apple" text="apple music" class="linktree-button" link="https://music.apple.com/us/artist/gain-online/1744697316"/>
            <LinkButton icon="soundcloud" text="soundcloud" class="linktree-button" link="https://soundcloud.com/gain_online"/>
        </div>
    )
}