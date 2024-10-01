import React, { ReactNode } from 'react';
import { FilterProvider } from '@/context/FilterContext';
import { SortProvider } from '@/context/SortContext';

interface FilterAndSortProviderProps {
    children: ReactNode;
}

export const FilterAndSortProvider: React.FC<FilterAndSortProviderProps> = ({
    children,
}) => {
    return (
        <FilterProvider>
            <SortProvider>{children}</SortProvider>
        </FilterProvider>
    );
};
