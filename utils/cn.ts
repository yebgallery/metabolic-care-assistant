import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNamesInput: ClassValue[]): string {
  return twMerge(clsx(classNamesInput));
}
