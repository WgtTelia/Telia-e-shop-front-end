import React, { ReactNode } from 'react';
import { FilterProvider } from '@/context/FilterContext';
import { SortProvider } from '@/context/SortContext';

interface CombinedProviderProps {
    children: ReactNode;
}

export const CombinedProvider: React.FC<CombinedProviderProps> = ({
    children,
}) => {
    return (
        <FilterProvider>
            <SortProvider>{children}</SortProvider>
        </FilterProvider>
    );
};
