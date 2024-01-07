// import "./posts.css"
'use client';
import { Break, BlogPost } from "../../../components/blog/blogPost"
import React, { useState } from "react"

export default function Posts(){
    var [expanded, setExpanded] = useState(false)
    return (
        <React.Fragment>
            <NewsFeed/>
            {/* <TeslasAndReligion/> */}
            <div className="expand-button" onClick={() => setExpanded(!expanded)}>
                <img src="/logos/logo black.png" style={{maxHeight: "100%"}} className={(expanded ? "open" : "closed")}/>
            </div>
        </React.Fragment>
    )
}


function NewsFeed(){
    return (
        <BlogPost title="news feed" date="7 january 2024 - 1:05pm">
            moving things around a bit. going to have the landing page function as a feed
            for new things. also gonna expand the types of posts to better suit songs / drawings
        </BlogPost>
    )
}