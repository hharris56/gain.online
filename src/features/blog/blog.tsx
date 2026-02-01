"use client";

import { useState } from "react";
import { Break, BlogPost, Quote } from "@/features/blog/components";

import MediaPlayer from "@/components/mediaPlayer/mediaPlayer";
import { getFromMasterDict } from "@/models/artMasterList";
import { Gallery } from "@/components/gallery/gallery";
import ExpandButton from "@/components/buttons/expandButton";

export function Blog() {
  var [expanded, setExpanded] = useState(false);

  // TODO: implement filtering based on tags

  var posts = [
    <Feb1 key="2/1" />,
    <Jan31_3 key="1/31-3" />,
    <Jan31_2 key="1/31-2" />,
    <Jan31 key="1/31" />,
    <Jan25_6 key="1/25-6" />,
    <Jan25_5 key="1/25-5" />,
    <Jan25_4 key="1/25-4" />,
    <Jan25_3 key="1/25-3" />,
    <Jan25_2 key="1/25-2" />,
    <Jan25 key="1/25" />,
    <Jan24 key="1/24" />,
    <Jan6 key="1/6" />,
    <June2 key="6/2" />,
    <May17 key="5/17" />,
    <May13 key="5/13" />,
    <Apr26pt2 key="4/26-2" />,
    <Apr26 key="4/26" />,
    <Apr22 key="4/22" />,
    <Apr6 key="4/6" />,
    <Apr1 key="4/1" />,
    <Mar23pt2 key="3/23-2" />,
    <Mar23 key="3/23" />,
    <Mar18 key="3/18" />,
    <Mar15pt2 key="3/15-2" />,
    <Mar15 key="3/15" />,
    <Mar2 key="3/2" />,
    <Feb18 key="2/18" />,
    <Feb16 key="2/16" />,
    <Feb10 key="2/10" />,
    <Feb6 key="2/6" />,
    <Feb4 key="2/4" />,
    <Jan28pt2 key="1/28-2" />,
    <Jan28 key="1/28" />,
    <Jan20 key="1/20" />,
    <Jan14pt2 key="1/14-2" />,
    // <Jan14 key="1/14"/>,
    <Jan13 key="1/13" />,
    <Jan7 key="1/7" />,
  ];

  return (
    <div>
      {expanded ? posts : posts.slice(0, 5)}
      {/* <ExpandButton
        expanded={expanded}
        callback={() => setExpanded(!expanded)}
        color="black"
      /> */}
    </div>
  );
}

function Feb1() {
  return (
    <BlogPost title="the places we've been" date="1 february - 12:28pm">
      im sitting at the park across the street from where i used to live. its
      one of those beautiful places where it feels like nothings really changed.
      the green grass and blue sky, the smell of eucaliptus, the feeling of the
      sun on my back and the sound of birds in trees nearby; its all the same as
      just a few years ago when i would come here what felt like weekend.
      <Break />
      i've always been an overly sentimental person, and while im doing my best
      to not let those emotions impact my decisions, it does feel nice every
      once in a while to sit with that feeling for a bit. a vauge meloncholy, a
      bittersweet appreciation for what once was.
      <Break />
      thats all for today. maybe some site work later but im really enjoying
      this minimal aesthetic. until i find a good way to incorperate other tabs
      itll remain just this blog. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan31_3() {
  return (
    <BlogPost title="steady as she goes" date="31 january - 4:35pm">
      tailwind migration is coming along nicely. im pulling back the site's
      content to just this blog for the time being in an effort to scope the
      amount of stuff i have to migrate right now. im also doing everything in
      my power to remove legacy references to 'useIsMobile', that crazy hook i
      wrote to check which layout to display.
      <Break />
      as a side effect we'll get some small stylistic updates to certain
      components, plus i've decided to shift back into light mode for the time
      being; i just love how the white and blue looks together.
      <Break />
      thats all for now but incase this is the last update today, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan31_2() {
  return (
    <BlogPost title="the great name debate" date="31 january - 12:38pm">
      another thing i thought of today is a potential separation of this site
      and my main music promotion. while this seems like overkill at the moment
      heres my thoughts on it:
      <Break />
      1. gain.audio (its taken RAHHHH)
      <Break />
      i really love this url and i feel like i could host a really simplistic
      SPA that acts like a linktree for new releases and what not. i could try
      out different design stuff without having to port this entire site and it
      would be much leaner on content.
      <Break />
      2. gain archive (idk the actual url yet)
      <Break />
      the true motivation behind this site is not promotion but archival. i
      intended it to be a portfolio / museum of all my prior works; a single
      location to view all the stuff i've made, not just the recent things. i
      love doing this but also trying to promote / push new content to the front
      has always felt awkward / forced in this context.
      <Break />
      anyways, i just wanted to get that idea down in writing. will lyk soon if
      any urls get purchased. chat then :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan31() {
  return (
    <BlogPost title="what doesn't kill you" date="31 january - 12:01pm">
      on the docket for today is (hopefully) a light lift with big impact.
      implementing tailwind styles will be a bit tedious but id also really like
      to get a light / dark mode working for the site.
      <Break />
      in addition to the site work i'm also really pushing to get some music
      releases scheduled TODAY. one thing that i am frustratingly bad at is
      commiting to releasing music. the making part is my favorite, the sharing
      with others not so much.
      <Break />
      last thing i'd like to try out is some exploratory work for a home media
      server. i have an old laptop kicking around from university thats been
      doing a whole lot of nothing the past few years, so im thinking i could
      flash it with popOS or some other lightweight linux distro and spin up a
      jellyfin server. that in tandem with a couple of hard drives i pulled from
      my late pc (may he rest in peace) should be enough to get the groundwork
      laid for future expansions. and before you ask no i haven't looked into
      exposing it outside my local network, though i may cross that bridge
      sooner rather than later.
      <Break />
      ill update as things progress - chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25_6() {
  return (
    <BlogPost title="for the record" date="25 january - 10:18pm">
      just wanted to say i got the site back up and live. no pretty url or
      anything yet but we are back in action officially. next step will be
      moving off the device check and migrating to tailwind. i feel like those
      will go hand in hand for the most part. then i have GOT get markdown going
      because writing posts like this is absurd.
      <Break />
      anyways, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25_5() {
  return (
    <BlogPost title="a peak behind the curtains" date="25 january - 9:48pm">
      i've been poking around the codebase a bunch and you would not believe the
      shit younger me cooked up to cover for stuff i didn't know existed. for
      background this site is written in react, specifically nextjs with
      typescript.
      <Break />
      firstly, the entire application is wrapped with a root layout that checks
      the window dimensions on every rerender. this functionality is outsourced
      to a hook called isMobile which i refernce all over the codebase for
      conditional rendering and styling.
      <Break />
      additionally, all the colors are set using another hook called
      colorManager. colorManager (referred to as cm) has some default colors
      that act as the baseline and when cm is instanciated in the baseLayout it
      calls resetColors, effectively setting the entire pallet for the site. i'm
      actually reallly fond of this solution as it let me dynamically change
      colors across different pages, so maybe this sticks around until i can
      cook up a better way to that.
      <Break />
      last and least crazy is i used to be a custom css warrior. every component
      has its own class, sometimes two when needing to define both desktop and
      mobile. i forgot how much i used to hate on tailwind and now i must pay
      the price.
      <Break />
      might go make some music instead. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25_4() {
  return (
    <BlogPost title="bigger fish to fry" date="25 january - 4:26pm">
      so the quality of life stuff is up and working which is great, but there
      are some deeper rooted issues that have bubbled up thanks to me updated
      all my package versions. specifically there is something wrong with how i
      initially checked for mobile vs desktop devices, which i will be replacing
      with css (probably tailwinds) breakpoints.
      <Break />
      this is unfortunately going to be a much larger lift than i intiallly
      hoped so idk if the site will be back up today or not. wish me luck and
      we'll chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25_3() {
  return (
    <BlogPost title="progess" date="25 january - 3:27pm">
      alright this post is half update half test. i got pnpm working and setup
      some pre-commit hooks as well. i also setup an auto-lint of staged stuff
      to see if i can run prettier automatically and the only way to test it is
      to stage some stuff so here goes nothing.
      <Break />
      chat soon. extra soon if this doesn't work, but i have a feeling it will
      :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25_2() {
  return (
    <BlogPost title="#todo" date="25 january - 2:31pm">
      theres a lot to do on this site man. i just spent a good amount of time
      looking over what i made a year or 2 ago and the bones are solid, but
      theres a lot of things ive learned and opinions ive changed in the past 12
      months that are going to require some heavy lifting on the technical side.
      <Break />
      1. these posts are written in custom HTML
      <Break />
      i have defined custom tags for breaks, quotes, indents and whatever else
      has been used in these posts. it was cool at first but i think switching
      to markdown will be better, so i guess i'll have to convert all these
      legacy posts to markdown as well.
      <Break />
      2. file structure
      <Break />
      big fan of the bulletproof react's guide to project structure, separating
      similar functionality into 'features' and having all related stuff under
      that one directory. as you can imagine this website is not setup like
      that, in fact it is an app/ directory with routes and a components/
      directory with everything else.
      <Break />
      3. tailwind & css for that matter
      <Break />
      i could (and probably will at some point) write an entire post about my
      opinions on tailwind but the TLDR is that while i was initially against
      it, i now am a believer that abstraction should take place at the
      component level and tailwind is fantastic if you operate under that
      asumption.
      <Break />
      i was also unaware of css breakpoints when i initially wrote this website.
      mobile vs desktop view is determind with a useEffect that watches the
      window.width.
      <Break />
      4. quality of life
      <Break />
      there are a lot of code management tools that i had not taken advantage of
      when initially building this site. i think it would be good to take some
      time and implement them. specifically looking at you (pre-commit, pnpm).
      <Break />
      5. site structure
      <Break />
      the last, biggest, most impactful, and most amiguious is the actual layout
      and interaction map of this website. i'd really like to simplify the
      landing page. i'd really like to display music differently. i don't even
      know if i want to have my visual art up. much to consider, but i thought i
      should atleast write it down for now.
      <Break />
      so yea, theres a lot to do on this site man. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan25() {
  return (
    <BlogPost title="act 2" date="25 january - 2:09pm">
      its been a year and some change since the last entry into this log and i
      still dont know where to begin. last year was a whirlwind of stuff. two
      new jobs, moving back and forth across the country, and an indescribably
      sense of longing for the monotiny of a previous lifestyle.
      <Break />
      ive undoubtedly grown a lot. i think its one of those things where your
      life splits into many directions around the age of 27. things i thought i
      knew, like what i wanted to do and who i wanted to be, really got tested
      over these past few months. the impermenence of stuff has always bothered
      me, in fact i think that is one of the most consistent motivations for me
      to make music; it feels like capturing something that will live forever
      unchanged. i know thats not true but it still feels special to me.
      <Break />
      i want to approach things differently this time around. i want to be more
      technical, more effeceint, and less reliant on some boundless motivation
      that i often delude myself into believing i have.
      <Break />
      so cheers to that, and welcome to act 2. the death of sentimentality and
      the birth of something else entirely.
      <Break />
      chat soon :)
      <Break />
      + gain
      <Break />
      oh also - the site is going to go through some major changes over the next
      few months. i hope to cover a lot of it in separate posts, so keep an eye
      out for those.
    </BlogPost>
  );
}
function Jan24() {
  return (
    <BlogPost title="overseas, from your bedroom" date="24 january - 10:22pm">
      two weeks of 'overseas' in the books and what a start. the reception was
      unreal, having people text me unprompted talking about how much they liked
      the new project was so heartwarming. my friends posting my songs on their
      stories and sharing with their friends man it was all really surreal.
      thank you so much to everyone who supported and if you havent yet check
      out 'overseas' on all platforms.
      <Break />
      so whats next? i'm working on some post release promotional material to
      keep pushing overseas for the next month or two. these include visualizers
      for a few of my favorite songs, some flyers and graphics to associate with
      the album and lastly a super special secret project that im still trying
      to pull off. additionally i'm finishing fleshing out the 'overseas' page
      on the site, including some of my biggest influences and a deeper dive
      into the story behind the music. also still trying to get a few of my
      songs added to playlists on spotify but it might take longer than expected
      because i need to figure out what genre these songs slot into lmao.
      <Break />
      anyways, lots in the works and there is new music coming soon<sup>tm</sup>
      , some jungle first then maybe a few new singles for those esoteric
      electronica enjoyers. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan6() {
  return (
    <BlogPost title="better late than never" date="6 january - 10:45pm">
      there is more to update you on than i care to write out, sorry for the
      absence. making it to 6 months last year with regular posts was better
      than i was expecting, but lets get past 8 this time around.
      <Break />
      that 'overseas' album i hinted at in my last post drops this friday.
      making it has been a trip and i'm really really excited for it to be
      officially released, especially after seeing how much love the 3 singles
      received. i moved to SF last october and am still settling in but man does
      living in a walkable city make a huge difference. i also picked up the
      piano around that time and now i'm able to play a few songs, looking into
      lessons this year.
      <Break />
      i've got a ton more i want to discuss but it's getting late so i'll save
      it for upcoming posts. the start of a new year always feels fresh and i'm
      glad the site is back in action. we'll be chatting again real soon,
      promise :)
      <Break />+ gain
    </BlogPost>
  );
}

function June2() {
  return (
    <BlogPost title="take me there" date="2 june - 5:06pm">
      i had my first official release on spotify yesterday. 'copenhagen' is the
      first single off a new ep (maybe album) that i've been working on called
      'overseas'. its an ambient house / tech house project that focuses heavily
      on creating an atmosphere for the listener to exist in. with droning
      synths and stripped down drums overseas sounds like an empty parking lot
      at midnight, barren and desolate yet somewhat peaceful and meditative. its
      some of my favorite music to date and i'm currently trying to flesh out
      the project with some extra tracks while keeping the vision very coherent.
      <Break />
      aside from that i've been working to re-imagine album covers for some of
      my previous work. still trying to figure out how to fit in coding
      projects. for the first time in a while i have a bunch of small things i
      want to create, its just that finding the time can be difficult.
      <Break />
      let me get back to it and we'll chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function May17() {
  return (
    <BlogPost title="in the works" date="17 may 12:21am">
      im looking forward to returning to the library this weekend. its been a
      few months since the last appearance and i have a few coding projects id
      like to get a start on. treating the library trip like a mini hackathon
      could be a lot of fun, ill return to this in a later post.
      <Break />
      also, i recorded over an hour of armored core fights with press this
      evening. that game has so much steez, i had a ton of fun and the footage
      looks great - maybe i can use it to practice editing on capcut.
      <Break />
      vacation has been fun but its time to lock back in. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function May13() {
  return (
    <BlogPost title="a simple, simple man" date="13 may - 2:18pm">
      today is one of the best days i've had in years. its beautiful weather,
      the sun is shining and the sky is a deep deep blue. i picked up{" "}
      <i>the power of now</i> by eckhart tolle and it seems we may have another
      book for the club. theres still a post or two to be written about{" "}
      <i>the stronghold</i>, that will come in due time, but for now i wanted to
      highlight just how lucky i feel to be alive today.
      <Break />
      theres this song from my childhood, 'great day to be alive' by travis
      tritt. i remember my dad playing it out the radio on warm summer weekends
      while he washed the cars or landscaped. looking back i feel so
      indescribably lucky to grow up the way i did. my parents did such a good
      job of teaching me how to manuever through the ups and downs of life. even
      aside from that i feel lucky to be who i am, someone who's able to shake
      things off easily and see the best in most scenes.
      <Break />
      i admit this post is a bit out of place but i needed to tell someone,
      write it down somewhere, because i am feeling the best i have in ages.
      love you guys, book club soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Apr26pt2() {
  return (
    <BlogPost
      title="perspective shift"
      date="26 april - 9:22am"
      tags={["site updates", "web dev"]}
    >
      i've been hesitant to release these site changes because they shift away
      from my initial design for the desktop view. however, as i was working to
      flesh out the individual album pages i realized that having the website be
      a static width (visually speaking) with the top bar always spanning the
      entire screen caused some serious design headaches for laying out content.
      for one, screen size would drastically impact the viewing experience of
      the website. secondly, a wider screen meant content felt stretched thin;
      this was especially apparent on the home page where certain blog posts
      would have paragraphs barely spanning one line.
      <Break />
      so the solution is to shift the orientation of the website. i accomplished
      this by reworking the top navigation bar into a side bar that sits on the
      left side of the screen. the large plus logo now opens a drawer menu that
      allows for site navigation and i really like this changes as it parallels
      the mobile ui's similar design choice. i do think that while this new
      design looks (very) good, it does lose a little of the sauce that the
      original design had, which is why it took me a week or two to decide
      whether or not to go through with the changes. after reflecting though i
      think the benefits of the new orientation out weigh the loss of sauce, and
      therefor with this post i will be deploying the new ui.
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Apr26() {
  return (
    <BlogPost
      title="the stronghold (ch 10 - 15)"
      date="26 april - 8:25am"
      tags={["the stronghold", "book club"]}
    >
      it has been a little since the last discussion post and, to be completely
      honest, i was planning to recap chapters 10-20 all together, but after
      rereading the material i think these first 6 deserve their own entry. the
      previous chapter ended with drogo deciding to stay at the fortezza, and we
      open to him returning to his room more or less justifying to himself that
      he had made the right decision to say. he speaks about this things that
      had originally bothered him,
      <Break />
      <Quote>
        the crack in the ceiling over his bed ... the dripping cistern ... the
        sag his body hollowed out in the mattress ... the blankets that felt so
        inhospitable in the early days.
      </Quote>
      <Break />
      and how over time he had not only grown accustom but had become actually
      quite fond of them.
      <Break />
      <Quote>
        all these things had now become drogo's and to leave them would have
        caused him pain
      </Quote>
      <Break />
      i find this excerpt interesting because that seems to always be the case.
      for me it was the subpar conditions of the college dorms i lived in, or
      the poor weather of the town i grew up in; these things become precious in
      a strange way.
      <Break />
      moving to the next chapter we pick up with drogo <u>two years</u> later.
      he has a strange dream about augustina (another officer at the fortezza)
      that heavily foreshadows some events to come. the next day while out at
      the furthest redoubt they spot a horse crossing the desert to the north.
      this spirals into a big climax at the end of the chapter where a soldier
      gets caught between doing his duty or helping his friend. he's bound by
      rules to take aim against his comrade who is approaching the fortezza at
      night after retrieving the horse. i love how buzzati describes this scene
      <Break />
      <Quote>
        the sentry, however, was no longer moretto. he was simply a sentry with
        a hard face who had raised his rifle and was now taking aim against a
        friend. without turning lazzari retreated several steps, stumbling on
        the stones. "it's me, lazzari!" he shouted. "don't you see it's me?
        don't shoot, moretto!". but the sentry was no longer the moretto who
        would frankly joke with his colleagues. he was just a sentry at the
        fortezza, wearing a uniform made from dark blue cloth with a leather
        bandolier, absolutely identical to every other sentry in the night
      </Quote>
      <Break />
      buzzati's interjection of small details during these tense scenes, like
      the description of the soldier's uniform during the heat of this moment,
      adds to both the imagery and suspense. it's like he is toying with the
      reader, always keeping the resolution just a few words away.
      <Break />
      the last thing i want to discuss takes place near the end of chapter 15
      and brings drogo's dream from chapter 12 to fruition. the tldr is that
      augustina is too stubborn to stay alive, and dies playing a game of cards{" "}
      <b>by himself</b> on an exposed mountaintop during a snowstorm just to
      prove a point to opposing forces that their spirits are not broken despite
      not reaching the summit. reading that aloud this scenario seems hilarious
      but the way buzzati paints the scene is both moving and heartbreaking all
      at once. the imagery he invokes is incredible, likening augstinas
      situation to that of a painting in the fortezza.
      <Break />
      <Quote>
        an old painting that hung in the hall at the fortezza represented the
        end of the prince sebastiano. the prince lay in the heart of the forest
        mortally wounded, leaning his back against a tree, his head slumped
        slightly to one side, his cloak falling in harmonious folds. nothing in
        the image evoked the brutal physical cruelty of death... the painter had
        completely preserved the prince's nobility and extreme elegance.
        agustina had now begun to resemble prince sebastiano.
      </Quote>
      <Break />
      the fact it takes about 2 and half pages for him to die is the hardest
      part. captain monty is watching augstina in awe the entire time, pleading
      him to come back under the shelter, but in the end he does nothing to help
      him. augustina dies there on the mountain top, encased in snow and ice,
      leaned against a boulder with a "thin smile on his lips".
      <Break />
      these are some of the more difficult posts to write up as they usually end
      up being much longer than generic site / life updates. i'll try to get the
      remaining chapters recapped soon (as well as a final review once im
      finished with the book), but until then keep an eye out for a site update
      coming today or tomorrow. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Apr22() {
  return (
    <BlogPost
      title="from the shadows"
      date="22 april - 8:51pm"
      tags={["site updates", "music", "deeper still"]}
    >
      been spending a lot of time irl these past two weekends catching up with
      some good friends and doing things away from the computer. i did make some
      major site changes last weekend but haven't pushed them yet since they
      completely overhaul the desktop interface and are still a few stages away
      from finished.
      <Break />
      music has been the highlight though - about a week and a half ago i
      finally tapped into this sound i have been chasing for like a year so. if
      you know me at all i've probably tried to show you my favorite artist
      'cult member' and after months of taking bits and pieces from his music i
      finally sat down and tried to make a full on song. the final product
      turned out so good it immediately became a 3 track ep and i gotta say this
      is probably some of my best work yet (although i may be a bit biased).
      super excited to share what with you all but first... we must go{" "}
      <b>deeper</b>.
      <Break />
      <i>deeper still</i> is a 4 song ambient breaks / jungle ep i put together
      during the february-march timeframe of this year. it started as a
      composition study, trying to better understand how songs are layed out and
      progress, but ended up as a concept ep about a group of explorers a
      hundred years from now venturing deep into the earths crust on a globally
      funded expedition. the full story can be found on the album page (whenever
      i get around to making it) or in the album + song descriptions found on
      soundcloud. the big news regarding <i>deeper still</i> is that i just
      finished uploading it on distrokid, and it should be available on major
      streaming services april 30th. this is my first ever release on a major
      platform and im half ecstatic half petrified as to how it will turn out.
      i'm kinda hoping it flops so i can learn the process of editing / revising
      / reuploading tracks through distrokid while the stakes are low.
      <Break />
      anyways, that's all for now. i have a flight to catch this week so keep an
      eye out for incoming changes. as always, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Apr6() {
  return (
    <BlogPost
      title="is this thing on?"
      date="6 april - 4:10pm"
      tags={["site updates"]}
    >
      and with that we are live! three (plus) months of development have gotten
      us this far, im excited to see what else is in store for this year. next
      up is putting music on streaming services. i have the first track from a
      new project being mastered right now, depending on how well that turns out
      i will get the rest of it mastered and release it on spotify along with
      some of my previous projects (thinking commuter and maybe even infrared).
      i still haven't decided how i am going to break up the styles, or if im
      even going to separate them in the first place, but that is a discussion
      for another day.
      <Break />
      for now i want to sit back and appreciate that i have an actual website
      that i developed and published by myself :) it feels good seeing my
      creative vision come to fruition. this whole thing has been a long time
      coming and to know that i'm finally at the point where i can support /
      promote all of my creative endeavors in a single location... weeee
      aaarreee lliiiivveeeeeeee!
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Apr1() {
  return (
    <BlogPost
      title="april's fool"
      date="1 april - 10:30pm"
      tags={["site updates"]}
    >
      website ready for release, new album in the finishing stages, and a nice
      vacation planned for the end of the month. april is going to be a good
      one, i can feel it.
      <Break />
      i wanted to hop on for a second just to update you all quick. the website
      is a go for launch, im just in the process of picking out what domain
      extension to purchase. i've narrowed it down to the following 3 options
      <Break />
      - gain.ceo
      <div />
      - gain.computer
      <div />
      - gain.im
      <Break />
      i have no idea how to pick from these remaining few, and i think part of
      the issue is that this website is supposed to be both a creative and
      professional portfolio - so the idea of appealing to that broad of an
      audience is making this decision extra difficult.
      <Break />
      on a side note: gain.online is taken but i have not given up hope. i
      emailed the company currently using that domain to see if they're open to
      selling, fingers crossed on that.
      <Break />
      i'll drop an update when the site goes live, chat then :)
      <Break />+ gain
    </BlogPost>
  );
}

function Mar23pt2() {
  return (
    <BlogPost
      title="back with another"
      date="23 march - 4:05 pm"
      tags={["web dev", "site updates"]}
    >
      so im not rendering the mobile view by default. this was a great change
      (thanks for the suggestion) as it still looks pretty good on desktop *and*
      most of the time desktop traffic will go through the /landing page
      anyways, giving the site time to adjust before any content is shown.
      <Break />
      i also added the sticky navbar for mobile along with some visual
      improvements (the line decorations live!!)
      <Break />
      publishing soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Mar23() {
  return (
    <BlogPost
      title="technical difficulties"
      date="23 march - 2:49pm"
      tags={["web dev"]}
    >
      so remember in the last post when i said this?
      <Break />
      <Quote>
        + reworked how the webapp determines mobile vs web view which removed an
        issue that caused the desktop version to render by default
      </Quote>
      <Break />
      yea well that broke every single button on the app, but only in production
      *facepalm*. i'm pretty sure the issue has to do with the previous page not
      unmounting since i was not setting any content until after running a
      useEffect hook that checks if it should render mobile (useEffects will
      only run after the component has finished mounted). the result was the
      page would not update until you manually refreshed it. this couldn't stay
      for obvious reasons, so if you ever see the desktop site render on mobile
      pretend like you didn't.
      <Break />
      ...
      <Break />
      as i wrote that i realized i could just make the mobile site the default
      since that will still look fine on desktop. gonna put that in now then go
      read a book or something idk. spent a week on this btw.
      <Break />
      chat (under better circumstances) soon :/
      <Break />+ gain
    </BlogPost>
  );
}

function Mar18() {
  return (
    <BlogPost
      title="website changes"
      date="18 march - 6:06pm"
      tags={["web dev", "site updates"]}
    >
      had a ton of time on the plane this past weekend, heres some stuff i
      managed to knock out for the website:
      <Break />
      + reworked how the webapp determines mobile vs web view which removed an
      issue that caused the desktop version to render by default
      <div />
      + enhanced blog posts with tags, filtering based on tags will be coming
      shortly
      <div />
      + mobile UI/UX redesign - really love how the menu and navigation worked
      out
      <div />
      + created new landing page, turned previous landing page into the home
      page
      <Break />
      more updates coming soon but i think we are right on schedule for the end
      of march release. looking forward to sharing more with you when it's
      ready. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Mar15pt2() {
  return (
    <BlogPost
      title="the stronghold: discussion pt 1"
      date="15 march - 12:44pm"
      tags={["the stronghold", "book club"]}
    >
      i was recommended dino buzzati's{" "}
      <i>
        <u>the stronghold</u>
      </i>{" "}
      by my sister who just finished reading it this past weekend. she's a much
      more avid reader than myself and as such her recommendations always seem
      to resonate with me. in fact she originally introduced me to paulo cuelo
      through{" "}
      <i>
        <u>the alchemist</u>
      </i>{" "}
      which had a lasting impact on my life and resulted in me reading a large
      part of cuelo's collection. Back to <i>the stronghold</i>, this post will
      cover chapters 1-9.
      <Break />
      my initial impression of buzzati's writing style (and lawrence ventui's
      translation by extension) is mixed positive. their use of imagery is
      awesome, and i especially love the description of nighttime both at the
      stronghold and in the city. some great excerpts include:
      <Break />
      <Quote>
        at that hour, they were thinking, a fine mist must have materialized and
        the lamps were casting a tenuous, yellowish light ... shadowy couples
        sauntered down solitary streets and you could hear coachmen shouting ...
        echos of violins and laughter, women's voices in the dark ... it was a
        city made fascinating by thier youthful dreams, by its still-unknown
        adventures.
      </Quote>
      <Break />
      <Quote>
        outside, in the night, under the autumnal rain, the sentries paced. the
        water bucketing down on the terraces, gurgling in the gutters, streaming
        down the walls. outside the night was deep
      </Quote>
      <Break />
      on multiple occasions buzzati refers to the night as "deep" and i love it.
      i remember being a kid biking around the town i grew up in with my
      friends. the night held this heavy quietness that made it feel like we
      were the only people left awake in a sleeping world. 'deep' perfectly
      encapsulates this feeling, and also happens to be a word i have been
      interested in artistically as of late.
      <Break />
      buzzati's description of life is beautifully tragic as well. there is a
      passage at the end of chapter 6 that is heart-wrenching. i wont include it
      here (mainly due to length) but he creates this illustration of growing up
      through youth and into adulthood as a run that starts so freeing. suddenly
      there is this creeping feeling that time is closing in on you, friends go
      on ahead or get left behind, and it's followed by a crushing realization
      that
      <Break />
      <Quote>
        the good lies far behind, very far behind, and [you] passed it without
        realizing.
      </Quote>
      <Break />
      there are many points in this book so far that buzzati goes on a tear; a
      tangent that he hits with such perfect literary finesse that it resonates
      without feeling like he's droning on. i really admire that about his
      writing. thats something that i feel applies to all kinds of art,
      especially music. tapping into that resonate feeling and driving it home
      the perfect amount.
      <Break />
      last thing i want to touch on in this post is the 'twist' at the end of
      chapter 9. i knew it was coming, that it had to happen for the story to
      progress but the slow buildup during the scene was so so good. in the
      doctors office, mere moments away from getting his note approving his
      leave and yet drogo (the mc) is so caught up in the beauty of soldiers and
      the fortezza, the mountains and sky, his 'destiny' that was 'pressing him
      from the north' and it climaxes in him declining the medical exit. buzzati
      revealed what was going to happen without diminishing the impact of it
      actually occurring. wonderfully done.
      <Break />
      excited to have the first one of these done, it was pretty fun to write
      too if im being honest. reflection is something we could all use a bit
      more of. chat soon yea? :)
      <Break />+ gain
    </BlogPost>
  );
}

function Mar15() {
  return (
    <BlogPost
      title="mid flight update"
      date="15 march - 10:34am"
      tags={["flight", "test"]}
    >
      weekends are passing at an extraordinary pace this month. last week i was
      in los angeles for a family gathering, this weekend im headed to boston
      for a friends birthday. the mobile site is coming along really well
      actually. im happy with the design so far and its giving me a change to
      learn new things about nextjs while also refactoring some of the stuff i
      had previously written. i will say that formatting text for mobile is
      proving to be more difficult than i had imagined but oh well.
      <Break />
      another thing i wanted to mention was that i've picked up reading again.
      right now im shooting for a book per month, and i'm thinking about keeping
      a pseudo book club discussion going with a series of posts - keep an eye
      out for one later today.
      <Break />
      back to developing for now, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Mar2() {
  return (
    <BlogPost title="back from hell" date="2 march - 1:34pm">
      so i spent the last 2 weeks feverishly playing helldivers 2, and while
      that game is really great it wasn't great how much of my time it ate up.
      couple that with my family visiting the bay last week and we have our
      first missed weekend update of 2024. no new art or (finished) music to
      show for the past 2 weeks feels bad but there is an upside to this...
      <Break />
      <u>web enhancements</u>
      <Break />
      time away from my various projects has allowed me to reflect on the
      direction i am headed. for as proud as i am of what i've accomplished i'm
      not much closer to publicly sharing any of this work for a few big
      reasons; the biggest one being that while my webpage looks great on a
      desktop, 99% of users will be viewing on their phone. therefor the next
      enhancement to the website will be a mobile version and once that is
      finished (slated for april 1) i will move to publishing on a real url and
      sharing on my socials.
      <Break />
      <u>music direction</u>
      <Break />
      the variety of music i have been exploring lately is really pulling me in
      opposing directions stylistically. while i think there is overarching
      themes to my sound regardless of genre, creating separation between them
      may help with 'brand imaging' or whatever. for that reason i'm going to
      move most of my jungle / electronic music under a{" "}
      <a href="https://soundcloud.com/deora-ii" target="_blank">
        new artist name + account
      </a>
      . my main account{" "}
      <a href="https://soundcloud.com/gain_online" target="_blank">
        (gain audio)
      </a>{" "}
      will then be used for reposting those tracks as well as any artist centric
      music.
      <Break />
      <u>drawing</u>
      <Break />
      weeklies were fun but for the next month i am going to be focused on
      prepping the website for release, music production and physical fitness.
      there has to be a trade off somewhere and unfortunately i'm suspecting
      this is where i will take the biggest hit.
      <Break />
      thanks for sticking around, let's chat again soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Feb18() {
  const img = [getFromMasterDict("cars!", "911 targa")];
  var player = MediaPlayer(1745786022);
  return (
    <BlogPost
      title="have fun with it"
      date="18 february - 10:50am"
      tags={["weekly drawing", "weekly song"]}
    >
      good morning friends! the weather today is nice and sunny, the music has
      been grooving and i'm excited to share these new works with you all. first
      up is this porsche 911 in moonstone purple with the targa top. this photo
      was actually posted by my favorite car photograph syd (@deerfella) on
      twitter. eventually i'll write up a nice way to embed tweets in these
      posts but for now just use this ugly{" "}
      <a
        href="https://twitter.com/deerfella/status/1756375998868722027"
        target="_blank"
      >
        hyperlink
      </a>
      .
      <Gallery images={img} collectionName="cars!" />
      today is also an especially good day because i have new music to share as
      well. what started as a joke turned into one of my favorite tracks mainly
      due to an amazing lead synth. fell in love with the vibe on this track so
      i spent a solid amount of time making it sound as good as i could. hope
      you all enjoy.
      {player}
      let's chat soon, yea? :)
      <Break />+ gain
    </BlogPost>
  );
}

function Feb16() {
  return (
    <BlogPost title="day before" date="16 february - 2:47pm">
      early friday update, i got this new track ive been working on that im
      super happy with. going to put the finishing touches on tonight and post
      tomorrow. also wanted to mention that im entertaining the idea of
      releasing a electronic pop ep composed of a couple songs ive recorded over
      the past few years. if so i will need to touch up the tracks and maybe
      retake some vocals, stay tuned for more information on that.
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Feb10() {
  return (
    <BlogPost
      title="living life, one month at a time"
      date="10 february - 2:30pm"
    >
      i've been thinking a lot about accountability recently. it feels like my
      entire life (up to fairly recently) i have been running from
      accountability, sometimes even unknowingly. i'm not a very forward
      thinking person - i revel in the now, trying to enjoy each moment as much
      as possible. this approach to life has been fine so far. it has allowed me
      to leave each phase of my life feeling like i truly did enjoy it to the
      best of my capability, but now that im in the longest, and dare i say most
      impactful, phase of life i have been unsatisfied with my ability to
      achieve goals in both the short and long term.
      <Break />
      this is where accountability comes into the picture. trying to find ways
      to effectively hold myself accountable has been at the top of my mind and
      it seems like i respond well to time-boxed habits. for example, new years
      resolutions work well for me because i can engrain into my subconcious
      that for this current year i will do <i>*insert activity*</i> on a given
      cadence (very much like these weekly updates). this is a great starting
      point, but evalutating once a year is not often enough to make meaningful
      progress in the short term.
      <Break />
      today is chinese new year and i had a revelation. i was thinking to myself
      "man, a second new years sure is useful. i wish there was a new years
      every month" and then it hit me:{" "}
      <b>
        <i>why not treat each month like its own year.</i>
      </b>{" "}
      the realization was so simple it felt surreal. i could take a single day
      each month to reflect upon everything i accomplished in the prior couple
      weeks then set goals and new resolutions for the coming couple weeks. each
      month becomes its own experiment where i could try out new routines /
      habits without the pressure of upholding them for an entire year. the
      flexibility of adjusting my routine to match artistic / life goals is
      pretty awesome too.
      <Break />
      all this to say im excited to start planning life out a bit. im sure we'll
      chat soon :) and i plan to share each month's goals + resolutions in a
      post around the 1st from here on out.
      <Break />
      + gain
      <Break />
    </BlogPost>
  );
}

function Feb6() {
  const img = [getFromMasterDict("cars!", "mr2 mk1")];

  return (
    <BlogPost
      title="mid week"
      date="6 february - 10:43pm"
      tags={["weekly drawing"]}
    >
      this drawing came out too good to wait for the weekend. check out this
      beautiful gen 1 mr2.
      <Gallery images={img} collectionName="cars!" />i modified the colors a bit
      bc the original grey was too boring and the blue looks <b>fantastic.</b>{" "}
      maybe i'll have another drawing before the weekend... we'll see about
      that.
      <Break />
      on a music related note my friend invited me to a discord server he
      created. the plan right now is to post a song per week (perfect with my
      current schedule) and then talk about the process used / any creative
      decisions along the way. pretty excited for that since it's been a long
      time since i've had friends invested in music - miss u noPress!
      <Break />
      anyways, i'll be back this weekend with a usual update. promise that
      eventually i'll get to filling out the audio tab. chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Feb4() {
  const img = [getFromMasterDict("cars!", "tacoma")];

  return (
    <BlogPost
      title="second thoughts"
      date="4 february - 9:18pm"
      tags={["weekly drawing"]}
    >
      {/* there's a lot about my personal life i don't really want to dive into in this blog, but one thing i think i should be transparent about (in hopes that it may help someone else down the line) is my relationship with substance abuse. i have what some may call an 'addictive personality'. from my perspective this manifests as a desire to have fun <i>all</i> the time, even when i know that i shouldn't. in recent years i have outgrown a lot of these habits and learned when and how to say no, but what's been bothering me the most lately is just how often i find myself thinking about it - to be clear here im talking about weed. this incessant thought that lingers after smoking has me seriously doubting if i will ever be able to have a normal relationship with weed. */}
      i wrote some long winded post about personal things going on in my life
      but commented it out because i don't think im comfortable sharing those
      thoughts yet. for now i leave you with this drawing of my friends tacoma,
      the{" "}
      <a href="https://soundcloud.com/gain_online/sets/commuter">
        official release link
      </a>{" "}
      of my new ep, and a quote i really needed to reread.
      <Break />
      <i>
        "it is a shame for a man to grow old without seeing the beauty and
        strength of which his body is capable."
      </i>{" "}
      - i think this also applies to the creation of great works. it is shame
      for a man to grow old without seeing the beauty of which he is capable of
      bringing into the world.
      <Gallery images={img} collectionName="cars!" />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan28pt2() {
  return (
    <BlogPost title="commuting time" date="28 january 2024 - 10:44am">
      so theres this new ep i've been working on / hinting at for a couple weeks
      now. commuter - a mini jazz jungle / breakcore album came about from a one
      off song that was supposed to be part of the midnight club series.
      {/* <div style={{display: "flex", height: "20rem", margin: "2rem 1rem 2rem 1rem"}}>
                <img src="/art/albums/Commuter Cover.jpg" style={{height: "100%"}} />
            </div> */}
      <Break />
      the since release single 'tuned in' needed something to fill in the
      emptiness when the drums were pulled. i decided to throw in an old
      recording of a houston traffic report and voila, an idea was born. a
      jungle / breakcore ep centered around the morning commute. it was
      incredibly fitting since i almost always use my own morning commute to
      study new music or analize my own tracks.
      <Break />
      sound design / scaping for the ep was decidely consistent, using almost
      exclusively a set of vital presets i've created over the past year, the fl
      studio stock electric piano, recorded bass guitar (it's been getting
      better) and of course, the amen + think + funky drummer breaks. this ep
      was incredibly fun to make and i genuinely feel the limitation of elements
      really pushed my creativity of how to use those pieces.
      <Break />
      after commuter i think we'll be locking in for vol 2 of the midnight club
      series or something similar. i have so many ideas of where i want to take
      this music, now its just about executing it. steam commuter on soundcloud
      january 29 - other platforms in however long a release takes.
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan28() {
  const img = [getFromMasterDict("cars!", "mr2")];

  return (
    <BlogPost
      title="locked in?"
      date="28 january 2024 - 10:30am"
      tags={["weekly drawing"]}
    >
      you know that feeling when things start to click? creating this week felt
      super rewarding. pushed out 2 new songs to round out commuter (both hits
      btw) and ended up with a really nice drawing (shoutout toyota's designers
      for making a car as gorgeous as the mr2).
      <Gallery images={img} collectionName="cars!" />
      ill be back in a follow up post to discuss commuter in more depth - maybe
      ill also figure out what id like to do with that 'audio' tab in the
      navigation bar.
      <Break />
      chat <i style={{ fontWeight: "800" }}>real</i> soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan20() {
  const img = [getFromMasterDict("cars!", "ae86")];

  return (
    <BlogPost
      title="one of those weeks"
      date="20 january 2024 - 2:41pm"
      tags={["weekly drawing"]}
    >
      struggled through this week with easily the most difficult drawing by far.
      the front looked so good but something about the perspective made getting
      everything else to look right almost impossible. anyways, this was a third
      attempt and i had to call it after that before i lost my mind.
      <Gallery images={img} collectionName="cars!" />
      ill be back next week with a better drawing and more music. also, lets
      discuss this 'commuter' ep then too.
      <Break />
      thanks for tuning in, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan14pt2() {
  var player = MediaPlayer(1709548257);

  return (
    <BlogPost
      title="musical addition"
      date="14 january 2024 - 1:03pm"
      tags={["weekly song"]}
    >
      did some refactoring and figured out the soundcloud embedding pretty
      quickly so heres that new track. really really happy with how this one
      turned out... it actually inspired a mini project ive dubbed 'commuter'.
      More info on that later.
      {player}
      fyi, this soundcloud embed is just an interm solution until i figure out a
      better way to display my audio work. this is the year i will put my music
      on major distibuting platforms, fingers crossed i get to that sooner
      rather than later.
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan14() {
  var newImages = [
    getFromMasterDict("cars!", "saab"),
    getFromMasterDict("cars!", "f150"),
  ];
  return (
    <BlogPost
      title="it begins"
      date="14 january 2024 - 11:20am"
      tags={["weekly drawing"]}
    >
      well, here we are. the first of many weekly updates for 2024. overachieved
      a bit this week and created more than expected but im going to keep the
      minimum requirement at one per week. still havent figured out how i should
      display both art and music in the same blog post so for now you just get
      the new drawings.
      <div>
        <Gallery images={newImages} collectionName="cars!" />
      </div>
      think im going to flesh out the audio tab now, chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan13() {
  return (
    <BlogPost title="new year, new intentions" date="13 january 2024 - 1:50pm">
      i figured it best to put my intentions for this year down in writing
      somewhere. theres a lot that i want to get better at in 2024, both
      personally and artistically, and the key idea that persists through both
      of those catagories is consistency. that is why for the next year i am
      going to make a minimum of 1 song and 1 drawing each week. ill upload them
      here in a new blog post every weekend and maybe even throw in a few
      thoughts about how my process as a creative is progressing. there is much
      to expand upon with this new practice but for now, lets keep things
      simple.
      <Break />
      chat soon :)
      <Break />+ gain
    </BlogPost>
  );
}

function Jan7() {
  return (
    <BlogPost title="wip" date="7 january 2024 - 1:05pm">
      moving things around a bit. going to have the landing page function as a
      feed for new things. also gonna expand the types of posts to better suit
      songs / drawings.
      <Break />+ gain
    </BlogPost>
  );
}
