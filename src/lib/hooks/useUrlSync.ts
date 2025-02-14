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

const BACKEND_KEY_MAP: Record<FilterKey, string> = {
    productGroups: 'productGroup',
    brands: 'brand',
    priceIntervals: 'priceInterval',
    colors: 'color',
    stockOptions: 'stockOptions',
};

export const useUrlSync = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrl = useCallback(
        (filters: Partial<Filter>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(filters).forEach(([key, value]) => {
                const backendKey = BACKEND_KEY_MAP[key as FilterKey] || key;
                if (Array.isArray(value) && value.length > 0) {
                    params.set(backendKey, value.join(','));
                } else {
                    params.delete(backendKey);
                }
            });

            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        },
        [pathname, router, searchParams]
    );

    const getInitialFilters = useCallback(() => {
        const filters: Partial<Pick<Filter, FilterKey>> = {};

        FILTER_KEYS.forEach((key) => {
            const backendKey = BACKEND_KEY_MAP[key];
            const value = searchParams.get(backendKey);
            if (value) {
                filters[key] = value.split(',');
            }
        });

        return filters;
    }, [searchParams]);

    return { updateUrl, getInitialFilters };
};
