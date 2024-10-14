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
        options: getStockOptions(selectedFilters.availableOptions?.stock) || [],
    },
];

export const getStockOptions = (stockOptions?: StockOption[]): string[] => {
    const options = new Set<string>();

    if (stockOptions) {
        stockOptions.forEach((stockOption) => {
            if (stockOption.qtyInStock > 0) {
                options.add('In Stock');
            } else {
                options.add('Out of Stock');
            }
        });
    }

    const optionsTest = Array.from(options);
    return optionsTest;
};
