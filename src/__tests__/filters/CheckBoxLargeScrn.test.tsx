import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';

const mockUseFilter = jest.fn();
jest.mock('@/context/FilterContext', () => ({
    useFilter: () => mockUseFilter(),
}));

jest.mock('@/components/product/ProductGrid', () => ({
    ProductGrid: () => <div>Product Grid</div>,
}));

describe('Checkbox for Larger Screens', () => {
    const mockToggleCheckbox = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseFilter.mockReturnValue({
            selectedFilters: {
                productGroups: [],
                brands: [],
                priceIntervals: [],
                colors: [],
                stockOptions: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });
    });

    it('renders checkboxes with labels correctly', async () => {
        render(
            <CheckBoxLargeScrn
                name='productGroups'
                title='Product Groups'
                options={['Group 1', 'Group 2']}
            />
        );

        expect(
            await screen.findByRole('heading', { name: /Product Groups/i })
        ).toBeInTheDocument();
        expect(
            await screen.findByRole('checkbox', { name: /Group 1/i })
        ).toBeInTheDocument();
        expect(
            await screen.findByRole('checkbox', { name: /Group 2/i })
        ).toBeInTheDocument();
    });

    it('displays the correct checkbox state based on selectedFilters', async () => {
        mockUseFilter.mockReturnValueOnce({
            selectedFilters: {
                productGroups: ['Group 1'],
                brands: [],
                priceIntervals: [],
                colors: [],
                stockOptions: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });

        render(
            <CheckBoxLargeScrn
                name='productGroups'
                title='Product Groups'
                options={['Group 1', 'Group 2']}
            />
        );
        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: /Group 1/i })
            ).toBeChecked()
        );
        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: /Group 2/i })
            ).not.toBeChecked()
        );
    });

    it('calls toggleCheckbox with correct arguments when a checkbox is checked', async () => {
        render(
            <CheckBoxLargeScrn
                name='productGroups'
                title='Product Groups'
                options={['Group 1', 'Group 2']}
            />
        );

        const checkbox = screen.getByRole('checkbox', { name: /Group 1/i });
        fireEvent.click(checkbox);

        await waitFor(() =>
            expect(mockToggleCheckbox).toHaveBeenCalledWith(
                'productGroups',
                'Group 1',
                true
            )
        );
    });

    it('calls toggleCheckbox with correct arguments when a checkbox is unchecked', async () => {
        mockUseFilter.mockReturnValueOnce({
            selectedFilters: {
                productGroups: ['Group 1'],
                priceIntervals: [],
                colors: [],
                stockOptions: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });

        render(
            <CheckBoxLargeScrn
                name='productGroups'
                title='Product Groups'
                options={['Group 1', 'Group 2']}
            />
        );

        const checkbox = screen.getByRole('checkbox', { name: /Group 1/i });
        fireEvent.click(checkbox);

        await waitFor(() =>
            expect(mockToggleCheckbox).toHaveBeenCalledWith(
                'productGroups',
                'Group 1',
                false
            )
        );
    });

    it('renders nothing when no options are provided', async () => {
        render(
            <CheckBoxLargeScrn
                name='productGroups'
                title='Product Groups'
                options={[]}
            />
        );

        await waitFor(() =>
            expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
        );
    });
});
