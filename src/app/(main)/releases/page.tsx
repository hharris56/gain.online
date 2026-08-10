import { Blog } from "@/features/blog/blog";
import { Releases } from "@/features/releases/releases";

export default function ReleasesPage() {
  return (
    <div className="min-w=[var(--content-width)]">
      <div className="flex flex-col gap-8 my-8">
        <Releases />
      </div>
      <img src="/art/mountain - copy.png" className="w-full" />
    </div>
  );
}
