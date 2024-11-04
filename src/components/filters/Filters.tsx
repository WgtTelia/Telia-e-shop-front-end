'use client';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { useFilter } from '@/context/FilterContext';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { getFilterSections } from '@/lib/utils/filterUtils';

export const Filters = () => {
    const { handleFilterChange, selectedFilters } = useFilter();

    const filterSections = getFilterSections(selectedFilters);

    return (
        <>
            <SortRadioGroup />
            <FilterCheckboxGroup
                form={undefined}
                filterSections={filterSections}
                handleFilterChange={handleFilterChange}
            />
        </>
    );
};
