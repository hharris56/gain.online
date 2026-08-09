import { twMerge } from "tailwind-merge";

interface LineDecorationProps {
  className?: string;
}
export const LineDecoration = ({ className }: LineDecorationProps) => {
  return (
    <div
      className={twMerge(
        "gradient-y min-w-1 min-h-full mr-4 md:mr-8",
        className,
      )}
    />
  );
};
