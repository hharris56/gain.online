import { Blog } from "@/features/blog/blog";
import { Break } from "@/features/blog/components";

export default function Home() {
  return (
    <div className="min-w=[var(--content-width)]">
      <h1 className="text-4xl font-bold my-4 md:mt-0">gain.online</h1>
      <div>
        hey, welcome to my corner of the web. my name is{" "}
        <mark className="bg-(--primary-text-color) text-(--primary-text-color)">
          nicetrylol
        </mark>{" "}
        but online i go by gain. im a 27yo artist, programmer, and avid enjoyer
        of all things related to music and design. this site acts like a
        personal blog, check out some of my music via the socials below. enjoy
        your stay :)
        <Break />+ gain
        {/* of all things related to music and design. check out some of my work, */}
        {/* you can reach me via the contact page or find me on my socials. */}
      </div>
      {/* <h2 style={{marginBottom: "0rem", textAlign: "center"}}><i>++</i> whats new? <i>++</i></h2> */}
      <div className="pr-8 my-8 sm:pr-16 md:max-w-[80%]">
        <Blog />
      </div>
      <img src="/art/mountain - copy.png" className="w-full" />
    </div>
  );
}
