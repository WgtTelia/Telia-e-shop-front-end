import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FilterModal } from '@/components/modals/FilterModal';
import { useFilter } from '@/context/FilterContext';
import { getFilterSections } from '@/lib/utils/filterUtils';

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

    beforeEach(() => {
        jest.clearAllMocks();
        (useFilter as jest.Mock).mockReturnValue({
            handleFilterChange: mockHandleFilterChange,
            setIsModalOpen: mockSetIsModalOpen,
            isModalOpen: true,
            selectedFilters: {
                types: [],
                brands: [],
                priceRanges: [],
                colors: [],
                stock: [],
                availableOptions: {
                    types: ['Type 1', 'Type 2'],
                    brands: ['Brand A', 'Brand B'],
                    priceRanges: ['0-50', '51-100'],
                    colors: ['Red', 'Green'],
                    stock: [{ qtyInStock: 5 }, { qtyInStock: 0 }],
                },
            },
        });

        (getFilterSections as jest.Mock).mockReturnValue([
            { name: 'types', title: 'Type', options: ['Type 1', 'Type 2'] },
        ]);
    });

    it('renders the modal with filter options', () => {
        render(<FilterModal />);

        expect(screen.getByRole('dialog')).toBeVisible();
        expect(screen.getByText('Filter by')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
    });

    it('calls handleFilterChange and setIsModalOpen when the form is submitted', async () => {
        render(<FilterModal />);

        const checkbox = screen.getByRole('checkbox', { name: /Type 1/i });
        fireEvent.click(checkbox);

        const submitButton = screen.getByRole('button', {
            name: /See results/i,
        });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockHandleFilterChange).toHaveBeenCalledWith('types', [
                'Type 1',
            ]);
        });

        const closeButton = screen.getByTestId('modal-close');
        fireEvent.click(closeButton);
        expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
});
