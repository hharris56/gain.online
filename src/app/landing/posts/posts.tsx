'use client';
import React, { useState } from "react"
import { Break, BlogPost } from "../../../components/blog/blogPost"
import "./posts.css"
import { getFromMasterDict } from "../../visual/artMasterList";
import Gallery from "../../../components/gallery/gallery";

export default function Posts(){
    var [expanded, setExpanded] = useState(false)

    var posts = [
        <Jan14 key="1/14"/>,
        <Jan13 key="1/13"/>,
        <Jan7 key="1/7"/>
    ]
    return (
        <React.Fragment>
            {expanded ? posts : posts.slice(0, 2)}
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>
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

function Jan14(){
    var newImages = [
        getFromMasterDict("cars!", "saab"),
        getFromMasterDict("cars!", "f150")
    ]
    return (
        <BlogPost title="it begins" date="14 january 2024 - 11:20am">
            whelp, here we are. the first of many weekly updates for 2024. overachieved a bit and created 
            more than expected but im going to keep the minimum requirement still at one per week. still havent
            figured out how i should display both art and music in the same blog post so for now you just get 
            the new drawings.
            <div>
                <Gallery images={newImages} collectionName="cars!" />
            </div>
            think im going to flesh out the audio tab now, chat soon :)
            <Break/>
            + gain
        </BlogPost>
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