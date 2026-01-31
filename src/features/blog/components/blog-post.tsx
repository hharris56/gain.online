import { LineDecoration } from "@/components/line-decoration";
import { Tag } from "./tag";

interface BlogProps {
  title: string;
  date: string;
  tags?: string[];
  children: any;
}

export function BlogPost(props: BlogProps) {
  return (
    <div className="flex flex-row mb-8" key={props.title}>
      <LineDecoration />
      <div className="flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="underline">{props.title}</h3>
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
