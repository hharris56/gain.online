import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Box, Plus, Circle, Music, Headphones } from "react-feather";
import DropdownButton from "@/components/buttons/dropdownButton";

export function UniversalHeader({ children }: { children?: React.ReactNode }) {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={twMerge(
        // base stuff
        "z-10 sticky top-0 max-w-screen flex items-center justify-end",
        // mobile view
        "gradient-x min-h-16 p-2",
        // desktop view (96px wide btw)
        "md:h-[calc(100vh-4rem)] md:min-w-24 md:gradient-y md:p-4 md:gap-4 md:flex-col md: md:justify-start md:top-8",
      )}
    >
      {/* <Box className="cursor-pointer text-(--primary-color) opacity-0 hover:opacity-100" size="64px" />
      <Headphones className="cursor-pointer text-(--primary-color) opacity-0 hover:opacity-100" size="64px" /> */}
      {/* <DropdownButton
        sx="md:scale-150 pointer-events-none"
        color="black"
        expanded={isExpanded}
        callback={() => setExpanded(!isExpanded)}
      /> */}
    </div>
  );
}
