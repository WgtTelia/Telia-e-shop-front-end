import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resizeWindow(width: number) {
  global.innerWidth = width
  global.dispatchEvent(new Event('resize'))
}

export const getPosition = (buttonRef: React.RefObject<HTMLButtonElement>) => {
  if (!buttonRef.current) return { top: 0, left: 0 }
  return {
    top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight,
    left: buttonRef.current.offsetLeft,
  }
}
