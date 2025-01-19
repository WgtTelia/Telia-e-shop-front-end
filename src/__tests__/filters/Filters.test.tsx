import React from 'react';
import { render, screen } from '@testing-library/react';
import { Filters } from '@/components/filters/Filters';
import { useFilter } from '@/context/FilterContext';

jest.mock('@/components/filters/SortRadioGroup', () => ({
    SortRadioGroup: () => <div data-testid='sort-radio-group' />,
}));
jest.mock('@/components/filters/FilterCheckboxGroup', () => ({
    FilterCheckboxGroup: () => <div data-testid='filter-checkbox-group' />,
}));
jest.mock('@/context/FilterContext', () => ({
    useFilter: jest.fn(),
}));

describe('Filters', () => {
    it('renders SortRadioGroup and FilterCheckboxGroup when availableOptions are present', () => {
        (useFilter as jest.Mock).mockReturnValue({
            handleFilterChange: jest.fn(),
            selectedFilters: {
                availableOptions: {
                    productGroups: ['Type1', 'Type2'],
                    brands: ['Brand1', 'Brand2'],
                    priceIntervals: [
                        'price_monthly_0_50',
                        'price_monthly_50_100',
                    ],
                    colors: ['red', 'blue'],
                    stockOptions: ['In Stock', 'Out of Stock'],
                },
            },
        });

        render(<Filters />);
        expect(screen.getByTestId('sort-radio-group')).toBeInTheDocument();
        expect(screen.getByTestId('filter-checkbox-group')).toBeInTheDocument();
    });
});
