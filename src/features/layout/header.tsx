import { twMerge } from "tailwind-merge";
import { useState } from "react";
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
        // desktop view
        "md:h-[calc(100vh-2rem)] md:min-w-28 md:gradient-y md:flex-col md:justify-start md:p-8 md:top-8",
      )}
    >
      {/* <DropdownButton
        sx="md:scale-150 pointer-events-none"
        color="black"
        expanded={isExpanded}
        callback={() => setExpanded(!isExpanded)}
      /> */}
    </div>
  );
}
