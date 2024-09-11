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
            <LinkButton icon="spotify" text="spotify" class="linktree-button" sx={{marginTop: "2rem"}} link=""/>
            <LinkButton icon="apple" text="apple music" class="linktree-button" link=""/>
            <LinkButton icon="soundcloud" text="soundcloud" class="linktree-button" link=""/>
        </div>
    )
}