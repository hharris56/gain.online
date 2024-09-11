"use client"

import "./me.css"
import LinkButton from "../../components/buttons/linkButton"

export default function Me(){
    return (
        <div className="linktree-container">
            <img src="/assets/gain pfp.jpg" className="linktree-pfp"/>
            <h1><i>gain online</i></h1>
            <a>bay area electronic artist</a>
            <a>tech + ambient house || jungle + breakcore</a>
            <LinkButton icon="spotify" text="spotify" sx={{marginTop: "1rem"}} link=""/>
            <LinkButton icon="apple" text="apple music" sx={{marginTop: "0.5rem"}} link=""/>
            <LinkButton icon="soundcloud" text="soundcloud" sx={{marginTop: "0.5rem"}} link=""/>
        </div>
    )
}