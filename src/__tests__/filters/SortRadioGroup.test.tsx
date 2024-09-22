import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { useSort } from '@/context/SortContext';
import { SORT_OPTIONS } from '@/data/sortOption';

jest.mock('@/context/SortContext', () => ({
    useSort: jest.fn(),
}));

describe('SortRadioGroup', () => {
    const mockSetSortOption = jest.fn();

    const renderComponent = (sortOption = 'Most popular') => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption,
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
        expect(mockSetSortOption).toHaveBeenCalledWith(
            'Price: lowest to highest'
        );
    });

    it('displays the correct radio button as selected', () => {
        renderComponent('Price: highest to lowest');
        const radioButton = screen.getByLabelText('Price: highest to lowest');
        expect(radioButton).toBeChecked();
    });

    it('calls the setSortOption function with the correct argument when a radio button is clicked', () => {
        renderComponent();
        const radioButton = screen.getByLabelText('Price: lowest to highest');
        fireEvent.click(radioButton);
        expect(mockSetSortOption).toHaveBeenCalledWith(
            'Price: lowest to highest'
        );
    });
});
