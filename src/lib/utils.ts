import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resizeWindow(width: number) {
  global.innerWidth = width;
  global.dispatchEvent(new Event('resize'));
}
