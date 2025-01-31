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

const PRICE_INTERVAL_REGEX = /^price_monthly_(\d+)_(\d+)$/;

export const parsePriceInterval = (interval: string): PriceRange | null => {
    const matches = interval.match(PRICE_INTERVAL_REGEX);
    if (!matches) return null;

    const [_, minStr, maxStr] = matches;
    return {
        min: parseInt(minStr, 10),
        max: parseInt(maxStr, 10),
    };
};

export const isWithinPriceRange = (
    price: number,
    range: PriceRange
): boolean => {
    return price >= range.min && price <= range.max;
};

export const getStockStatus = (
    stockAmount: number
): keyof typeof StockStatus => {
    return stockAmount > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
};

export const formatPriceRange = (interval: string): string => {
    const matches = interval.match(PRICE_INTERVAL_REGEX);
    if (matches) {
        const min = parseInt(matches[1], 10);
        const max = parseInt(matches[2], 10);
        return `${min} - ${max} €/month`;
    }
    return interval;
};

export function formatAsTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
