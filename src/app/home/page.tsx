import { Blog } from "@/features/blog/blog";

export default function Home() {
  return (
    <div className="min-w=[var(--content-width)]">
      <h1 className="text-4xl font-bold my-4">gain online</h1>
      <div>
        hey, welcome to my corner of the web. my name is{" "}
        <mark className="bg-[var(--primary-text-color)] text-[var(--primary-text-color)]">
          u thought
        </mark>{" "}
        but online i go by gain. im a 27yo artist, programmer, and avid enjoyer
        of all things related to music and design. check out some of my work,
        you can reach me via the contact page or find me on my socials.
      </div>
      {/* <h2 style={{marginBottom: "0rem", textAlign: "center"}}><i>++</i> whats new? <i>++</i></h2> */}
      <div className="pr-4 my-8">
        <Blog />
      </div>
      <img src="/art/mountain - copy.png" className="w-full" />
    </div>
  );
}
