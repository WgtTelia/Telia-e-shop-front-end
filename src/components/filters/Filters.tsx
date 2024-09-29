'use client';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { FilterState, useFilter } from '@/context/FilterContext';
import { filterOptions } from '@/components/modals/FilterModal';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';

export const Filters = () => {
    const { handleImmediateChange } = useFilter();

    const filterSections = [
        {
            name: 'types' as keyof FilterState,
            title: 'Type',
            options: filterOptions.types,
        },
        {
            name: 'brands' as keyof FilterState,
            title: 'Brand',
            options: filterOptions.brands,
        },
        {
            name: 'priceRanges' as keyof FilterState,
            title: 'Price',
            options: filterOptions.priceRanges,
        },
        {
            name: 'colors' as keyof FilterState,
            title: 'Color',
            options: filterOptions.colors,
        },
        {
            name: 'stock' as keyof FilterState,
            title: 'Stock',
            options: filterOptions.stock,
        },
    ];

    return (
        <div className='hidden lg:col-span-1 lg:block'>
            <SortRadioGroup />
            <FilterCheckboxGroup
                form={null}
                filterSections={filterSections}
                onImmediateChange={handleImmediateChange}
            />
        </div>
    );
};
