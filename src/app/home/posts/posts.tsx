"use client"

import React, { useState } from "react"
import { Break, BlogPost, Quote } from "../../../components/blog/blog"
import MediaPlayer from "../../../components/mediaPlayer/mediaPlayer";
import "./posts.css"
import { getFromMasterDict } from "../../../models/artMasterList";
import { Gallery } from "../../../components/gallery/gallery";

export default function Posts(){
    var [expanded, setExpanded] = useState(false)

    // TODO: implement filtering based on tags

    var posts = [
        <Mar23 key="3/23"/>,
        <Mar18 key="3/18"/>,
        <Mar15pt2 key="3/15-2"/>,
        <Mar15 key="3/15"/>,
        <Mar2 key="3/2"/>,
        <Feb18 key="2/18"/>,
        <Feb16 key="2/16"/>,
        <Feb10 key="2/10"/>,
        <Feb6 key="2/4"/>,
        <Feb4 key="2/4"/>,
        <Jan28pt2 key="1/28-2"/>,
        <Jan28 key="1/28"/>,
        <Jan20 key="1/20"/>,
        <Jan14pt2 key="1/14-2"/>,
        <Jan14 key="1/14"/>,
        <Jan13 key="1/13"/>,
        <Jan7 key="1/7"/>
    ]
    return (
        <React.Fragment>
            {expanded ? posts : posts.slice(0, 3)}
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

function Mar23(){
    return (
        <BlogPost title="technical difficulties" date="23 march - 2:49pm">
            so remember in the last post when i said this?
            <Break />
            <Quote>
            + reworked how the webapp determines mobile vs web view which removed an issue that caused the desktop version to render by default
            </Quote>
            <Break />
            yea well that broke every single button the app, but only in product *facepalm*. the issue has to do with the previous page not unmounting due to me not setting any content until after a useEffect returns (which only returns after the component has mounted) resulting in the page not updating until you manually refreshed it. this couldn't stay for obvious reasons, so if you ever see the desktop site render on mobile pretend like you didn't.
            <Break />
            ...
            <Break />
            as i wrote that i realized i could just make the mobile site the default since that will still look fine on desktop. gonna put that in now then go read a book or something idk. spent a week on this btw.
            <Break />
            chat (under better circumstances) soon :)
            <Break />
            + gain
        </BlogPost>
    )
}

function Mar18(){
    return (
        <BlogPost title="website changes" date="18 march - 6:06pm" tags={["dev update"]}>
            had a ton of time on the plane this past weekend, heres some stuff i managed to knock out for the website:
            <Break/>
            + reworked how the webapp determines mobile vs web view which removed an issue that caused the desktop version to render by default
            <div/>
            + enhanced blog posts with tags, filtering based on tags will be coming shortly
            <div/>
            + mobile UI/UX redesign - really love how the menu and navigation worked out
            <div/>
            + created new landing page, turned previous landing page into the home page
            <Break />
            more updates coming soon but i think we are right on schedule for the end of march release. looking forward to sharing more with you when it's ready. chat soon :)
            <Break />
            + gain
        </BlogPost>
    )
}

function Mar15pt2(){
    return (
        <BlogPost title="the stronghold: discussion pt 1" date="15 march - 12:44pm" tags={["the stronghold", "book club"]}>
            i was recommended dino buzzati's <i><u>the stronghold</u></i> by my sister who just finished reading it this past weekend. she's a much more avid reader than myself and as such her recommendations always seem to resonate with me. in fact she originally introduced me to paulo cuelo through <i><u>the alchemist</u></i> which had a lasting impact on my life and resulted in me reading a large part of cuelo's collection. Back to <i>the stronghold</i>, this post will cover chapters 1-9.
            <Break />
            my initial impression of buzzati's writing style (and lawrence ventui's translation by extension) is mixed positive. their use of imagery is awesome, and i especially love the description of nighttime both at the stronghold and in the city. some great excerpts include:
            <Break/>
            <Quote>
                at that hour, they were thinking, a fine mist must have materialized and the lamps were casting a tenuous, yellowish light ... shadowy couples sauntered down solitary streets and you could hear coachmen shouting ... echos of violins and laughter, women's voices in the dark ... it was a city made fascinating by thier youthful dreams, by its still-unknown adventures.
            </Quote>
            <Break/>
            <Quote>
                outside, in the night, under the autumnal rain, the sentries paced. the water bucketing down on the terraces, gurgling in the gutters, streaming down the walls. outside the night was deep
            </Quote>
            <Break/>
            on multiple occasions buzzati refers to the night as "deep" and i love it. i remember being a kid biking around the town i grew up in with my friends. the night held this heavy quietness that made it feel like we were the only people left awake in a sleeping world. 'deep' perfectly encapsulates this feeling, and also happens to be a word i have been interested in artistically as of late.
            <Break />
            buzzati's description of life is beautifully tragic as well. there is a passage at the end of chapter 6 that is heart-wrenching. i wont include it here (mainly due to length) but he creates this illustration of growing up through youth and into adulthood as a run that starts so freeing. suddenly there is this creeping feeling that time is closing in on you, friends go on ahead or get left behind, and it's followed by a crushing realization that 
            <Break/>
            <Quote>
                the good lies far behind, very far behind, and [you] passed it without realizing.
            </Quote>
            <Break/>
            there are many points in this book so far that buzzati goes on a tear; a tangent that he hits with such perfect literary finesse that it resonates without feeling like he's droning on. i really admire that about his writing. thats something that i feel applies to all kinds of art, especially music. tapping into that resonate feeling and driving it home the perfect amount.
            <Break />
            last thing i want to touch on in this post is the 'twist' at the end of chapter 9. i knew it was coming, that it had to happen for the story to progress but the slow buildup during the scene was so so good. in the doctors office, mere moments away from getting his note approving his leave and yet drogo (the mc) is so caught up in the beauty of soldiers and the fortezza, the mountains and sky, his 'destiny' that was 'pressing him from the north' and it climaxes in him declining the medical exit. buzzati revealed what was going to happen without diminishing the impact of it actually occurring. wonderfully done.
            <Break />
            excited to have the first one of these done, it was pretty fun to write too if im being honest. reflection is something we could all use a bit more of. chat soon yea? :)
            <Break />
            + gain
        </BlogPost>
    )
}

function Mar15(){
    return (
        <BlogPost title="mid flight update" date="15 march - 10:34am" tags={["flight", "test"]}>
            weekends are passing at an extraordinary pace this month. last week i was in los angeles for a family gathering, this weekend im headed to boston for a friends birthday. the mobile site is coming along really well actually. im happy with the design so far and its giving me a change to learn new things about nextjs while also refactoring some of the stuff i had previously written. i will say that formatting text for mobile is proving to be more difficult than i had imagined but oh well.
            <Break/>
            another thing i wanted to mention was that i've picked up reading again. right now im shooting for a book per month, and i'm thinking about keeping a pseudo book club discussion going with a series of posts - keep an eye out for one later today.
            <Break/>
            back to developing for now, chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Mar2(){
    return (
        <BlogPost title="back from hell" date="2 march - 1:34pm">
            so i spent the last 2 weeks feverishly playing helldivers 2, and while that game is really great it wasn't great how much of my time it ate up. couple that with my family visiting the bay last week and we have our first missed weekend update of 2024. no new art or (finished) music to show for the past 2 weeks feels bad but there is an upside to this...
            <Break/>
            <u>web enhancements</u>
            <Break/>
            time away from my various projects has allowed me to reflect on the direction i am headed. for as proud as i am of what i've accomplished i'm not much closer to publicly sharing any of this work for a few big reasons; the biggest one being that while my webpage looks great on a desktop, 99% of users will be viewing on their phone. therefor the next enhancement to the website will be a mobile version and once that is finished (slated for april 1) i will move to publishing on a real url and sharing on my socials.
            <Break/>
            <u>music direction</u>
            <Break/>
            the variety of music i have been exploring lately is really pulling me in opposing directions stylistically. while i think there is overarching themes to my sound regardless of genre, creating separation between them may help with 'brand imaging' or whatever. for that reason i'm going to move most of my jungle / electronic music under a <a href="https://soundcloud.com/deora-ii" target="_blank">new artist name + account</a>. my main account <a href="https://soundcloud.com/gain_online" target="_blank">(gain audio)</a> will then be used for reposting those tracks as well as any artist centric music.
            <Break/>
            <u>drawing</u>
            <Break/>
            weeklies were fun but for the next month i am going to be focused on prepping the website for release, music production and physical fitness. there has to be a trade off somewhere and unfortunately i'm suspecting this is where i will take the biggest hit.
            <Break/>
            thanks for sticking around, let's chat again soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Feb18(){
    const img = [getFromMasterDict("cars!", "911 targa")]
    var player = MediaPlayer(1745786022)
    return (
        <BlogPost title="have fun with it" date="18 february - 10:50am" tags={["weekly drawing", "weekly song"]}>
            good morning friends! the weather today is nice and sunny, the music has been grooving and i'm excited to share these new works with you all. first up is this porsche 911 in moonstone purple with the targa top. this photo was actually posted by my favorite car photograph syd (@deerfella) on twitter. eventually i'll write up a nice way to embed tweets in these posts but for now just use this ugly <a href="https://twitter.com/deerfella/status/1756375998868722027" target="_blank">hyperlink</a>.
            <Gallery images={img} collectionName="cars!"/>
            today is also an especially good day because i have new music to share as well. what started as a joke turned into one of my favorite tracks mainly due to an amazing lead synth. fell in love with the vibe on this track so i spent a solid amount of time making it sound as good as i could. hope you all enjoy.
            {player}
            let's chat soon, yea? :)
            <Break/>
            + gain
        </BlogPost>
    )
    
}

function Feb16(){
    return (
        <BlogPost title="day before" date="16 february - 2:47pm">
            early friday update, i got this new track ive been working on that im super happy with. going to put the finishing touches on tonight and post tomorrow. also wanted to mention that im entertaining the idea of releasing a electronic pop ep composed of a couple songs ive recorded over the past few years. if so i will need to touch up the tracks and maybe retake some vocals, stay tuned for more information on that.
            <Break/>
            chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Feb10(){
    return (
        <BlogPost title="living life, one month at a time" date="10 february - 2:30pm">
            i've been thinking a lot about accountability recently. it feels like my entire life (up to fairly recently) i have been running from accountability, sometimes even unknowingly. i'm not a very forward thinking person - i revel in the now, trying to enjoy each moment as much as possible. this approach to life has been fine so far. it has allowed me to leave each phase of my life feeling like i truly did enjoy it to the best of my capability, but now that im in the longest, and dare i say most impactful, phase of life i have been unsatisfied with my ability to achieve goals in both the short and long term.
            <Break/>
            this is where accountability comes into the picture. trying to find ways to effectively hold myself accountable has been at the top of my mind and it seems like i respond well to time-boxed habits. for example, new years resolutions work well for me because i can engrain into my subconcious that for this current year i will do <i>*insert activity*</i> on a given cadence (very much like these weekly updates). this is a great starting point, but evalutating once a year is not often enough to make meaningful progress in the short term.
            <Break/>
            today is chinese new year and i had a revelation. i was thinking to myself "man, a second new years sure is useful. i wish there was a new years every month" and then it hit me: <b><i>why not treat each month like its own year.</i></b> the realization was so simple it felt surreal. i could take a single day each month to reflect upon everything i accomplished in the prior couple weeks then set goals and new resolutions for the coming couple weeks. each month becomes its own experiment where i could try out new routines / habits without the pressure of upholding them for an entire year. the flexibility of adjusting my routine to match artistic / life goals is pretty awesome too.
            <Break/>
            all this to say im excited to start planning life out a bit. im sure we'll chat soon :) and i plan to share each month's goals + resolutions in a post around the 1st from here on out.
            <Break/>
            + gain
            <Break/>
        </BlogPost>
    )
}

function Feb6(){
    const img = [getFromMasterDict("cars!", "mr2 mk1")]

    return (
        <BlogPost title="mid week" date="6 february - 10:43pm" tags={["weekly drawing"]}>
            this drawing came out too good to wait for the weekend. check out this beautiful gen 1 mr2.
            <Gallery images={img} collectionName="cars!"/>
            i modified the colors a bit bc the original grey was too boring and the blue looks <b>fantastic.</b> maybe i'll have another drawing before the weekend... we'll see about that.
            <Break/>
            on a music related note my friend invited me to a discord server he created. the plan right now is to post a song per week (perfect with my current schedule) and then talk about the process used / any creative decisions along the way. pretty excited for that since it's been a long time since i've had friends invested in music - miss u noPress!
            <Break/>
            anyways, i'll be back this weekend with a usual update. promise that eventually i'll get to filling out the audio tab. chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Feb4(){
    const img = [getFromMasterDict("cars!", "tacoma")]

    return (
        <BlogPost title="second thoughts" date="4 february - 9:18pm" tags={["weekly drawing"]}>
            {/* there's a lot about my personal life i don't really want to dive into in this blog, but one thing i think i should be transparent about (in hopes that it may help someone else down the line) is my relationship with substance abuse. i have what some may call an 'addictive personality'. from my perspective this manifests as a desire to have fun <i>all</i> the time, even when i know that i shouldn't. in recent years i have outgrown a lot of these habits and learned when and how to say no, but what's been bothering me the most lately is just how often i find myself thinking about it - to be clear here im talking about weed. this incessant thought that lingers after smoking has me seriously doubting if i will ever be able to have a normal relationship with weed. */}
            i wrote some long winded post about personal things going on in my life but commented it out because i don't think im comfortable sharing those thoughts yet. for now i leave you with this drawing of my friends tacoma, the <a href="https://soundcloud.com/gain_online/sets/commuter">official release link</a> of my new ep, and a quote i really needed to reread.
            <Break/>
            <i>"it is a shame for a man to grow old without seeing the beauty and strength of which his body is capable."</i> - i think this also applies to the creation of great works. it is shame for a man to grow old without seeing the beauty of which he is capable of bringing into the world.
            <Gallery images={img} collectionName="cars!" />
            chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan28pt2(){
    return (
        <BlogPost title="commuting time" date="28 january 2024 - 10:44am">
            so theres this new ep i've been working on / hinting at for a couple weeks now. commuter - a mini jazz jungle / breakcore album came about from a one off song that was supposed to be part of the midnight club series.
            {/* <div style={{display: "flex", height: "20rem", margin: "2rem 1rem 2rem 1rem"}}>
                <img src="/art/albums/Commuter Cover.jpg" style={{height: "100%"}} />
            </div> */}
            <Break/>
            the since release single 'tuned in' needed something to fill in the emptiness when the drums were pulled. i decided to throw in an old recording of a houston traffic report and voila, an idea was born. a jungle / breakcore ep centered around the morning commute. it was incredibly fitting since i almost always use my own morning commute to study new music or analize my own tracks. 
            <Break/>
            sound design / scaping for the ep was decidely consistent, using almost exclusively a set of vital presets i've created over the past year, the fl studio stock electric piano, recorded bass guitar (it's been getting better) and of course, the amen + think + funky drummer breaks. this ep was incredibly fun to make and i genuinely feel the limitation of elements really pushed my creativity of how to use those pieces.
            <Break/>
            after commuter i think we'll be locking in for vol 2 of the midnight club series or something similar. i have so many ideas of where i want to take this music, now its just about executing it. steam commuter on soundcloud january 29 - other platforms in however long a release takes.
            <Break/>
            chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan28(){
    const img = [getFromMasterDict("cars!", "mr2")]
    
    return (
        <BlogPost title="locked in?" date="28 january 2024 - 10:30am" tags={["weekly drawing"]}>
            you know that feeling when things start to click? creating this week felt super rewarding. pushed out 2 new songs to round out commuter (both hits btw) and ended up with a really nice drawing (shoutout toyota's designers for making a car as gorgeous as the mr2). 
            <Gallery images={img} collectionName="cars!" />
            ill be back in a follow up post to discuss commuter in more depth - maybe ill also figure out what id like to do with that 'audio' tab in the navigation bar.
            <Break/>
            chat <i style={{fontWeight: "800"}}>real</i> soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan20(){
    const img = [getFromMasterDict("cars!", "ae86")]

    return (
        <BlogPost title="one of those weeks" date="20 january 2024 - 2:41pm" tags={["weekly drawing"]}>
            struggled through this week with easily the most difficult drawing by far. the front looked so good but something about the perspective made getting everything else to look right almost impossible. anyways, this was a third attempt and i had to call it after that before i lost my mind.
            <Gallery images={img} collectionName="cars!"/>
            ill be back next week with a better drawing and more music. also, lets discuss this 'commuter' ep then too.
            <Break />
            thanks for tuning in, chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan14pt2(){
    var player = MediaPlayer(1709548257)

    return (
        <BlogPost title="musical addition" date="14 january 2024 - 1:03pm" tags={["weekly song"]}>
            did some refactoring and figured out the soundcloud embedding pretty quickly so heres
            that new track. really really happy with how this one turned out... it actually
            inspired a mini project ive dubbed 'commuter'. More info on that later.
            {player}
            fyi, this soundcloud embed is just an interm solution until i figure out a better way to display
            my audio work. this is the year i will put my music on major distibuting platforms, fingers crossed
            i get to that sooner rather than later.
            <Break/>
            chat soon :)
            <Break/>
            + gain
        </BlogPost>
    )
}

function Jan14(){
    var newImages = [
        getFromMasterDict("cars!", "saab"),
        getFromMasterDict("cars!", "f150")
    ]
    return (
        <BlogPost title="it begins" date="14 january 2024 - 11:20am" tags={["weekly drawing"]}>
            well, here we are. the first of many weekly updates for 2024. overachieved a bit this week and created more than expected but im going to keep the minimum requirement at one per week. still havent figured out how i should display both art and music in the same blog post so for now you just get the new drawings.
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
            for new things. also gonna expand the types of posts to better suit songs / drawings.
            <Break/>
            + gain
        </BlogPost>
    )
}