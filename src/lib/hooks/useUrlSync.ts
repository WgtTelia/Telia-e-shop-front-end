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
        (filtersAndSort: Partial<Filter & { sort: SortOptionValue }>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(filtersAndSort).forEach(([key, value]) => {
                let backendKey = key;
                if (key === 'productGroups') {
                    backendKey = 'productGroup';
                }

                if (key === 'sort') {
                    if (value) {
                        params.set('sort', value as string);
                    } else {
                        params.delete('sort');
                    }
                } else if (Array.isArray(value) && value.length > 0) {
                    params.set(backendKey, value.join(','));
                } else if (FILTER_KEYS.includes(key as FilterKey)) {
                    params.delete(backendKey);
                }
            });

            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        },
        [pathname, router, searchParams]
    );

    const getInitialFiltersAndSort = useCallback(() => {
        const filters: Partial<Pick<Filter, FilterKey>> = {};
        let sort: SortOptionValue | undefined;

        FILTER_KEYS.forEach((key) => {
            const backendKey = key === 'productGroups' ? 'productGroup' : key;
            const value = searchParams.get(backendKey);
            if (value) {
                filters[key] = value.split(',');
            }
        });

        const sortParam = searchParams.get('sort');
        if (
            sortParam &&
            (['POPULAR_DESC', 'PRICE_ASC', 'PRICE_DESC'] as string[]).includes(
                sortParam
            )
        ) {
            sort = sortParam as SortOptionValue;
        }

        return { ...filters, sort };
    }, [searchParams]);

    return { updateUrl, getInitialFilters: getInitialFiltersAndSort };
};
