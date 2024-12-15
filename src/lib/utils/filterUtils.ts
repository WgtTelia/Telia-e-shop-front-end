import { formatPriceRange } from '@/lib/utils';

export const getFilterSections = (selectedFilters: Filter) => [
    {
        name: 'types' as keyof FilterOptions,
        title: 'Type',
        options: selectedFilters.availableOptions?.productGroups || [],
    },
    {
        name: 'brands' as keyof FilterOptions,
        title: 'Brand',
        options: selectedFilters.availableOptions?.brands || [],
    },
    {
        name: 'priceRanges' as keyof FilterOptions,
        title: 'Price',
        options:
            selectedFilters.availableOptions?.priceIntervals.map(
                formatPriceRange
            ) || [],
    },
    {
        name: 'colors' as keyof FilterOptions,
        title: 'Color',
        options: selectedFilters.availableOptions?.colors || [],
    },
    {
        name: 'stock' as keyof FilterOptions,
        title: 'Stock',
        options: selectedFilters.availableOptions?.stockOptions || [],
    },
];
