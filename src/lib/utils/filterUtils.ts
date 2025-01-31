import { formatAsTitleCase, formatPriceRange } from '@/lib/utils';

export const getFilterSections = (selectedFilters: Filter) => [
    {
        name: 'productGroups' as keyof FilterOptions,
        title: 'Type',
        options: selectedFilters.availableOptions?.productGroups || [],
    },
    {
        name: 'brands' as keyof FilterOptions,
        title: 'Brand',
        options: selectedFilters.availableOptions?.brands || [],
    },
    {
        name: 'priceIntervals' as keyof FilterOptions,
        title: 'Price',
        options: selectedFilters.availableOptions?.priceIntervals || [],
        formatOption: formatPriceRange,
    },
    {
        name: 'colors' as keyof FilterOptions,
        title: 'Color',
        options: selectedFilters.availableOptions?.colors || [],
    },
    {
        name: 'stockOptions' as keyof FilterOptions,
        title: 'Stock',
        options: selectedFilters.availableOptions?.stockOptions || [],
        formatOption: formatAsTitleCase,
    },
];
