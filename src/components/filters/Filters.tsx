'use client';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { useFilter } from '@/context/FilterContext';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { formatPriceRange } from '@/lib/utils';

export const Filters = () => {
    const { handleFilterChange, selectedFilters } = useFilter();

    const filterSections = [
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
            options: ['In Stock', 'Out of Stock'],
        },
    ];

    return (
        <>
            <SortRadioGroup />
            {selectedFilters.availableOptions && (
                <FilterCheckboxGroup
                    form={undefined}
                    filterSections={filterSections}
                    handleFilterChange={handleFilterChange}
                />
            )}
        </div>
    );
};
