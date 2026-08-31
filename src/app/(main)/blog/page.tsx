import { Blog } from "@/features/blog/blog";

export default function Home() {
  return (
    <div className="min-w=[var(--content-width)]">
      <div className="my-8 flex flex-col gap-8">
        <Blog />
      </div>
      <img src="/art/mountain - copy.png" className="w-full" />
    </div>
  );
}
