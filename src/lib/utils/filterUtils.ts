import { formatPriceRange } from '@/lib/utils';

export const getFilterSections = (selectedFilters: Filter) => [
    {
        name: 'types' as keyof Filter,
        title: 'Type',
        options: selectedFilters.availableOptions?.types || [],
    },
    {
        name: 'brands' as keyof Filter,
        title: 'Brand',
        options: selectedFilters.availableOptions?.brands || [],
    },
    {
        name: 'priceRanges' as keyof Filter,
        title: 'Price',
        options:
            selectedFilters.availableOptions?.priceRanges.map(
                formatPriceRange
            ) || [],
    },
    {
        name: 'colors' as keyof Filter,
        title: 'Color',
        options: selectedFilters.availableOptions?.colors || [],
    },
    {
        name: 'stock' as keyof Filter,
        title: 'Stock',
        options: selectedFilters.availableOptions?.stock || [],
    },
];
