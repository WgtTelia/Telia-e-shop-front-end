import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';

const mockUseFilter = jest.fn();
jest.mock('@/context/FilterContext', () => ({
    useFilter: () => mockUseFilter(),
}));

describe('Checkbox for Larger Screens', () => {
    const mockToggleCheckbox = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseFilter.mockReturnValue({
            selectedFilters: {
                types: [],
                brands: [],
                priceRanges: [],
                colors: [],
                stock: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });
    });

    it('renders checkboxes with labels correctly', () => {
        render(
            <CheckBoxLargeScrn
                name='types'
                title='Type'
                options={['Type 1', 'Type 2']}
            />
        );

        expect(
            screen.getByRole('heading', { name: /Type/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('checkbox', { name: /Type 1/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('checkbox', { name: /Type 2/i })
        ).toBeInTheDocument();
    });

    it('displays the correct checkbox state based on selectedFilters', () => {
        mockUseFilter.mockReturnValueOnce({
            selectedFilters: {
                types: ['Type 1'],
                brands: [],
                priceRanges: [],
                colors: [],
                stock: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });

        render(
            <CheckBoxLargeScrn
                name='types'
                title='Type'
                options={['Type 1', 'Type 2']}
            />
        );

        expect(screen.getByRole('checkbox', { name: /Type 1/i })).toBeChecked();
        expect(
            screen.getByRole('checkbox', { name: /Type 2/i })
        ).not.toBeChecked();
    });

    it('calls toggleCheckbox with correct arguments when a checkbox is checked', () => {
        render(
            <CheckBoxLargeScrn
                name='types'
                title='Type'
                options={['Type 1', 'Type 2']}
            />
        );

        const checkbox = screen.getByRole('checkbox', { name: /Type 1/i });
        fireEvent.click(checkbox);

        expect(mockToggleCheckbox).toHaveBeenCalledWith(
            'types',
            'Type 1',
            true
        );
    });

    it('calls toggleCheckbox with correct arguments when a checkbox is unchecked', () => {
        mockUseFilter.mockReturnValueOnce({
            selectedFilters: {
                types: ['Type 1'],
                brands: [],
                priceRanges: [],
                colors: [],
                stock: [],
                isModalOpen: false,
            },
            toggleCheckbox: mockToggleCheckbox,
        });

        render(
            <CheckBoxLargeScrn
                name='types'
                title='Type'
                options={['Type 1', 'Type 2']}
            />
        );

        const checkbox = screen.getByRole('checkbox', { name: /Type 1/i });
        fireEvent.click(checkbox);

        expect(mockToggleCheckbox).toHaveBeenCalledWith(
            'types',
            'Type 1',
            false
        );
    });

    it('renders nothing when no options are provided', () => {
        render(<CheckBoxLargeScrn name='types' title='Type' options={[]} />);

        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
});
