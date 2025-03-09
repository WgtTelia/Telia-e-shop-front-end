import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';

jest.mock('@/context/SortContext', () => ({
    useSort: jest.fn(),
    SORT_OPTIONS: [
        { label: 'Most popular', value: 'POPULAR_DESC' },
        { label: 'Price: lowest to highest', value: 'PRICE_ASC' },
        { label: 'Price: highest to lowest', value: 'PRICE_DESC' },
    ],
}));

describe('SortRadioGroup', () => {
    const mockSetSortOption = jest.fn();

    const renderComponent = (
        sortOptionValue: SortOptionValueType = 'POPULAR_DESC'
    ) => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption: sortOptionValue,
            setSortOption: mockSetSortOption,
        });

        return render(<SortRadioGroup />);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of radio buttons', () => {
        renderComponent();
        const radioButtons = screen.getAllByRole('radio');
        expect(radioButtons).toHaveLength(SORT_OPTIONS.length);
    });

    it('sets the sortOption state correctly when a radio button is clicked', () => {
        renderComponent();
        const radioButton = screen.getByLabelText('Price: lowest to highest');
        fireEvent.click(radioButton);
        expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_ASC');
    });

    it('displays the correct radio button as selected', () => {
        renderComponent('PRICE_DESC');
        const radioButton = screen.getByLabelText('Price: highest to lowest');
        expect(radioButton).toBeChecked();
    });

    it('calls the setSortOption function with the correct argument when a radio button is clicked', () => {
        renderComponent();
        const radioButton = screen.getByLabelText('Price: lowest to highest');
        fireEvent.click(radioButton);
        expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_ASC');
    });
});
