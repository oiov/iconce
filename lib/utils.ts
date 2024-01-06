import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmail(str: string) {
  const reg = /^([a-zA-Z\d._%+-]+)@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
  return reg.test(str);
}
