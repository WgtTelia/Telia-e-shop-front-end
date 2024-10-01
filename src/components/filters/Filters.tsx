'use client';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { useFilter } from '@/context/FilterContext';
import { filterOptions } from '@/components/modals/FilterModal';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { formatPriceRange } from '@/lib/utils';

export const Filters = () => {
    const { handleImmediateChange } = useFilter();

    const filterSections = [
        {
            name: 'types' as keyof Filter,
            title: 'Type',
            options: filterOptions.types,
        },
        {
            name: 'brands' as keyof Filter,
            title: 'Brand',
            options: filterOptions.brands,
        },
        {
            name: 'priceRanges' as keyof Filter,
            title: 'Price',
            options: filterOptions.price_intervals.map(formatPriceRange),
        },
        {
            name: 'colors' as keyof Filter,
            title: 'Color',
            options: filterOptions.colors,
        },
        {
            name: 'stock' as keyof Filter,
            title: 'Stock',
            options: filterOptions.stock,
        },
    ];

    return (
        <div className='hidden space-y-5 lg:col-span-1 lg:block'>
            <SortRadioGroup />
            <FilterCheckboxGroup
                form={undefined}
                filterSections={filterSections}
                onImmediateChange={handleImmediateChange}
            />
        </div>
    );
};
