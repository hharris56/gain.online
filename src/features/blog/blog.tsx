"use client";

import { LineDecoration } from "@/components/line-decoration";

interface BlogProps {
  title: string;
  date: string;
  tags?: string[];
  children: any;
}

function BlogPost(props: BlogProps) {
  const isMobile = false;

  return (
    <div className="flex flex-row mb-8" key={props.title}>
      {/* <div className={"line-decoration" + (isMobile ? "-mobile" : "")} /> */}
      <LineDecoration />
      <div className="flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-xl underline">{props.title}</h3>
          <div className="h-6 flex gap-2">{props.tags?.map((t) => Tag(t))}</div>
        </div>
        <a className="text-xs text-[var(--secondary-text-color)]">
          {props.date}
        </a>
        <div className="mt-4">{props.children}</div>
        <div className="post-divider" />
      </div>
    </div>
  );
}

function Tag(name: string) {
  // return (
  //   <div className="tag-button" key={name}>
  //     # {name}
  //   </div>
  // );
  return (
    <div
      className="flex items-center px-2 rounded-full cursor-pointer bg-[var(--accent-color)] text-xs text-[var(--primary-color)]"
      key={name}
    >
      # {name}
    </div>
  );
}

function Break() {
  return <div style={{ margin: "1em" }} />;
}

function Quote(props: { children: any }) {
  return <div className="quote">"{props.children}"</div>;
}

export { BlogPost, Break, Quote };
