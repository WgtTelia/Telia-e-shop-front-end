import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function resizeWindow(width: number) {
    global.innerWidth = width;
    global.dispatchEvent(new Event('resize'));
}

export const getPosition = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    return {
        top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight,
        left: buttonRef.current.offsetLeft,
    };
};

export const formatPriceRange = (interval: string): string => {
    const matches = interval.match(/price_monthly_(\d+)_(\d+)/);
    if (matches) {
        const min = parseInt(matches[1], 10);
        const max = parseInt(matches[2], 10);
        return `${min} - ${max} €/month`;
    }
    return interval;
};
