import { LineDecoration } from "@/components/line-decoration";
import { cn } from "@/helpers/cn";

export interface ReleaseEntry {
  title: string;
  artist: string;
  coverPath: string;
  link?: string;
  description?: string;
  urlPath?: string;
  children?: any;
}

export const Release = ({
  title,
  artist,
  link,
  coverPath,
  description,
  urlPath,
}: ReleaseEntry) => {
  return (
    <div className="w-full flex flex-row">
      <LineDecoration />
      <div className="flex flex-col">
        {/* title */}
        <h2 className="mb-4 text-xl">
          <b>{artist}</b> | {title}
        </h2>

        {/* cover + content */}
        <div className={cn("flex flex-col xs:flex-row", "box-border")}>
          <img
            className="w-full xs:w-1/3 aspect-square mb-2 xs:mb-0"
            src={coverPath}
          />
          <div
            className={cn(
              "w-full h-full",
              "flex flex-col justify-center items-center",
            )}
          >
            <div className="xs:px-8 text-center">{description}</div>
            {link && <a href="">[listen now]</a>}
          </div>
        </div>
      </div>
    </div>
  );
};
