import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const FILTER_KEYS = [
    'productGroups',
    'brands',
    'priceIntervals',
    'colors',
    'stockOptions',
] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

export const useUrlSync = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrl = useCallback(
        (filters: Partial<Filter>) => {
            const params = new URLSearchParams(searchParams.toString());

            FILTER_KEYS.forEach((key) => {
                const value = filters[key];
                if (Array.isArray(value) && value.length > 0) {
                    params.set(key, value.join(','));
                } else {
                    params.delete(key);
                }
            });

            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams]
    );

    const getInitialFilters = useCallback(() => {
        const filters: Partial<Pick<Filter, FilterKey>> = {};

        FILTER_KEYS.forEach((key) => {
            const value = searchParams.get(key);
            if (value) {
                filters[key] = value.split(',');
            }
        });

        return filters;
    }, [searchParams]);

    return { updateUrl, getInitialFilters };
};
