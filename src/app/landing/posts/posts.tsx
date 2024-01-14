'use client';
import React, { useState } from "react"
import { Break, BlogPost } from "../../../components/blog/blogPost"
import "./posts.css"

export default function Posts(){
    var [expanded, setExpanded] = useState(false)

    var posts = [
        <Jan13/>,
        <Jan7/>
    ]
    return (
        <React.Fragment>
            {expanded ? posts : posts.slice(0, 1)}
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                {/* <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/> */}
                {!expanded ?
                <div style={{display:"flex", flexDirection:"row", width:"fit-content"}}>
                    <h1 className="dotdotdot">.</h1>
                    <h1 className="dotdotdot" style={{animationDelay:"0.2s"}}>.</h1>
                    <h1 className="dotdotdot" style={{animationDelay:"0.4s"}}>.</h1>
                </div> :
                <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className="open"/>
                }
            </div>
        </React.Fragment>
    )
}

function Jan13(){
    return (
        <BlogPost title="new year, new intentions" date="13 january 2024 - 1:50pm">
            i figured it best to put my intentions for this year down in writing somewhere. theres a lot
            that i want to get better at in 2024, both personally and artistically, and the key idea that
            persists through both of those catagories is consistency. that is why for the next year i am
            going to make a minimum of 1 song and 1 drawing each week. ill upload them here in a new blog
            post every weekend and maybe even throw in a few thoughts about how my process as a creative
            is progressing. there is much to expand upon with this new practice but for now, lets keep 
            things simple.
            <Break/>
            chat soon :) 
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan7(){
    return (
        <BlogPost title="wip" date="7 january 2024 - 1:05pm">
            moving things around a bit. going to have the landing page function as a feed
            for new things. also gonna expand the types of posts to better suit songs / drawings
            <Break/>
            + gain
        </BlogPost>
    )
}