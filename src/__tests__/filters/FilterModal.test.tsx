import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FilterModal } from '@/components/modals/FilterModal';
import { useFilter } from '@/context/FilterContext';
import { getFilterSections } from '@/lib/utils/filterUtils';
import { filterCategories } from '@/lib/utils/validationSchemas';

jest.mock('@/context/FilterContext');
jest.mock('@/lib/utils/filterUtils');

global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe('Filter Modal', () => {
    const mockHandleFilterChange = jest.fn();
    const mockSetIsModalOpen = jest.fn();
    const mockToggleCheckbox = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useFilter as jest.Mock).mockReturnValue({
            handleFilterChange: mockHandleFilterChange,
            setIsModalOpen: mockSetIsModalOpen,
            isModalOpen: true,
            selectedFilters: {
                productGroups: [],
                brands: [],
                priceIntervals: [],
                colors: [],
                stockOptions: [],
                availableOptions: {
                    productGroups: ['Type 1', 'Type 2'],
                    brands: ['Brand A', 'Brand B'],
                    priceIntervals: ['0-50', '51-100'],
                    colors: ['Red', 'Green'],
                    stockOptions: ['In Stock', 'Out of Stock'],
                },
            },
            toggleCheckbox: mockToggleCheckbox,
        });

        (getFilterSections as jest.Mock).mockReturnValue([
            {
                name: 'productGroups',
                title: 'Type',
                options: ['Type 1', 'Type 2'],
            },
            { name: 'brands', title: 'Brand', options: ['Brand A', 'Brand B'] },
            {
                name: 'priceIntervals',
                title: 'Price',
                options: ['0-50', '51-100'],
            },
            { name: 'colors', title: 'Color', options: ['Red', 'Green'] },
            {
                name: 'stockOptions',
                title: 'Stock',
                options: ['In Stock', 'Out of Stock'],
            },
        ]);
    });

    it('renders the modal with filter options', () => {
        render(<FilterModal />);

        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByText('Filter by')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
        expect(screen.getByText('Brand')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Color')).toBeInTheDocument();
        expect(screen.getByText('Stock')).toBeInTheDocument();
    });

    it('calls handleFilterChange and setIsModalOpen when the form is submitted', async () => {
        render(<FilterModal />);

        // Simulate checking 'Type 1'
        const checkbox = screen.getByRole('checkbox', { name: /Type 1/i });
        fireEvent.click(checkbox);

        // Expect toggleCheckbox to be called
        await waitFor(() => {
            expect(mockToggleCheckbox).toHaveBeenCalledWith(
                'productGroups',
                'Type 1',
                true
            );
        });

        // Submit the form
        const submitButton = screen.getByRole('button', {
            name: /See results/i,
        });
        fireEvent.click(submitButton);

        // Wait for handleFilterChange to be called for each category
        await waitFor(() => {
            filterCategories.forEach((category) => {
                expect(mockHandleFilterChange).toHaveBeenCalledWith(
                    category,
                    expect.any(Array)
                );
            });
        });

        // Expect setIsModalOpen to be called with false after form submission
        expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
});
