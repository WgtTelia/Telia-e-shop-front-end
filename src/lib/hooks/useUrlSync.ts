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

type UpdateUrlParams = Partial<Filter & { sort: SortOptionValueType }>;

export const useUrlSync = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrl = useCallback(
        (filtersAndSort: UpdateUrlParams) => {
            const params = new URLSearchParams(searchParams.toString());
            let filtersOrSortChanged = false;

            Object.entries(filtersAndSort).forEach(([key, value]) => {
                let backendKey = key;

                if (key === 'productGroups') {
                    backendKey = 'productGroup';
                }

                // --- Handle Sort Parameter ---
                if (key === 'sort') {
                    const currentSort = params.get('sort');
                    const newSortValue = value as
                        | SortOptionValueType
                        | undefined;

                    if (newSortValue && newSortValue !== currentSort) {
                        params.set('sort', newSortValue);
                        filtersOrSortChanged = true;
                    } else if (!newSortValue && currentSort) {
                        params.delete('sort');
                        filtersOrSortChanged = true;
                    }

                    // --- Handle Filter Parameters ---
                } else if (FILTER_KEYS.includes(key as FilterKey)) {
                    const currentValStr = params.get(backendKey);
                    // Prepare the new value string (comma-separated) or null if empty
                    const newValueString =
                        Array.isArray(value) && value.length > 0
                            ? value.join(',')
                            : null;

                    if (newValueString && newValueString !== currentValStr) {
                        // Add or update filter param
                        params.set(backendKey, newValueString);
                        filtersOrSortChanged = true;
                    } else if (!newValueString && currentValStr) {
                        // Remove filter param if new value is empty but current exists
                        params.delete(backendKey);
                        filtersOrSortChanged = true;
                    }
                }
            });

            // --- Reset Page if Filters or Sort Changed ---
            // If any filter or sort parameter was actually added, removed, or modified,
            // then reset the page parameter to 1.
            if (filtersOrSortChanged) {
                params.set('page', '1');
            }

            // --- Navigate only if Parameters Changed ---
            const finalParamsString = params.toString();
            if (searchParams.toString() !== finalParamsString) {
                router.replace(`${pathname}?${finalParamsString}`, {
                    scroll: false,
                });
            }
        },

        [pathname, router, searchParams]
    );

    /**
     * Reads the initial filter and sort state from the current URL search parameters.
     */
    const getInitialFiltersAndSort = useCallback(() => {
        const filters: Partial<Pick<Filter, FilterKey>> = {};
        let sort: SortOptionValueType | undefined;

        FILTER_KEYS.forEach((key) => {
            const backendKey = key === 'productGroups' ? 'productGroup' : key;
            const value = searchParams.get(backendKey);
            if (value) {
                filters[key] = value.split(',');
            }
        });

        const sortParam = searchParams.get('sort');

        const validSortOptions: SortOptionValueType[] = [
            'POPULAR_DESC',
            'PRICE_ASC',
            'PRICE_DESC',
        ];
        if (sortParam && (validSortOptions as string[]).includes(sortParam)) {
            sort = sortParam as SortOptionValueType;
        }

        return { ...filters, sort };
    }, [searchParams]);

    return { updateUrl, getInitialFilters: getInitialFiltersAndSort };
};
