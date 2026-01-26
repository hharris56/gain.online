import "./code.css";
import { Break } from "../../components/blog/blog";
import Link from "next/link";

export default function CodePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold my-4">gain program</h1>
      <a>
        assorted coding projects and some context about my time as a programmer.
        <Break />
        i've always had an affinity for well designed interfaces, and
        discovering web design in my mid teens through services like wix and
        square space presented me with a medium to create some of my own. the
        tools that initially peaked my interested soon felt too restricting, so
        after declaring as a computer science major i was disappointed by the
        lack of web design in my curriculum (zero required courses and only a
        small handful of electives that were always full). i tried learning html
        and css on my own, but this proved to be harder than i anticipated and
        for a while i hated web development, especially frontend, due to early
        difficulties. however, in recent years the design philosophy started to
        click and once i became confident in css it felt like a whole new door
        had opened for creating in the web space.
        <Break />
        that brings us to the this webpage. originally started as a test project
        on nextjs, ive decided to utilize it as a psuedo portfolio for my
        variety of creative endeavors. hopefully i learn a bit about website
        management, content creation, and curation along the way :)
      </a>
      <h2>projects</h2>
      <Link href="/code/remCycle" className="site-link-button">
        REM cycle
      </Link>
    </div>
  );
}
