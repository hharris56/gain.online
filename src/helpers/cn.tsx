import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StructuredClasses {
  mobile: ClassValue[];
  desktop: ClassValue[];
}

export function scn(input: StructuredClasses) {
  return cn(cn(input.mobile), cn(input.desktop.map((v) => "lg:" + v)));
}
