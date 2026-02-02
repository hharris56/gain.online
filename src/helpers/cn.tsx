// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from 'tailwind-merge';

/*
 * HELPER FUNCTION CN (CLASSNAME)
 * uses twMerge to dynamically create a single classname from args
 * valid args
 * - arbitrary # of strings (ie: 'flex flex-col', 'bg-blue-500 rounded-full', ...)
 * - structured input like
 * {
 *    md: "flex flex-col rounded-full",
 *    lg: "flex-row bg-blue-500",
 * }
 * - a mix of the above 2
 *
 * structured input is optional and will be assigned like cn(structured={}, "any other", "classes")
 * classes are applied in the following order: arbitrary -> structured
 * structure input will map the to key to all words in the value. ex:
 * { lg: "flex-row bg-blue-500" } -> "lg:flex-row lg:bg-bglue-500"
 **/

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }
