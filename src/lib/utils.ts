import { type ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge as twMergeOriginal } from "tailwind-merge";

export const twMerge = twMergeOriginal;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
