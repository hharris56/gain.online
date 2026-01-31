import { cn } from "@/helpers/cn";
import { twMerge } from "tailwind-merge";

interface LineDecorationProps {
  sx?: string;
}
export const LineDecoration = ({ sx }: LineDecorationProps) => {
  return (
    <div
      className={twMerge("line-decoration min-w-1 min-h-full mr-4 md:mr-8", sx)}
    />
  );
};
