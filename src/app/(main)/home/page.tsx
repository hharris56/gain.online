import { Blog } from "@/features/blog/blog";

export default function Home() {
  return (
    <div className="min-w=[var(--content-width)]">
      <h1 className="hidden text-4xl font-bold my-4 md:flex md:mt-0">
        gain.online
      </h1>
      <div className="mt-4">
        hey, welcome to my corner of the web. my name is{" "}
        <mark className="bg-(--primary-text-color) text-(--primary-text-color)">
          nicetrylol
        </mark>{" "}
        but <u>online</u> i go by <u>gain</u>. im a 27yo artist, programmer, and
        avid enjoyer of all things related to music and design. for now this
        site acts as a personal blog, soon it will return to functioning as an
        archive of my current and past works. until then you can check out some
        of my music via the socials below.
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
