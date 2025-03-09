import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SortButton } from '@/components/filters/SortButton';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

jest.mock('@/context/SortContext', () => {
    const mockSortOptions: SortOptionType[] = [
        { label: 'Most popular', value: 'POPULAR_DESC' },
        { label: 'Price: lowest to highest', value: 'PRICE_ASC' },
        { label: 'Price: highest to lowest', value: 'PRICE_DESC' },
    ];

    return {
        useSort: jest.fn().mockReturnValue({
            sortOption: 'POPULAR_DESC',
            setIsSheetOpen: jest.fn(),
            setIsDropDownOpen: jest.fn(),
            isDropDownOpen: false,
        }),
        SORT_OPTIONS: mockSortOptions,
    };
});

jest.mock('@/lib/hooks/useMediaQuery', () => ({
    useMediaQuery: jest.fn(),
}));

describe('SortButton', () => {
    const mockSetIsSheetOpen = jest.fn();
    const mockSetIsDropDownOpen = jest.fn();

    const renderComponent = (
        isMobile = false,
        isMedium = false,
        isDropDownOpen = false,
        sortOptionValue = 'POPULAR_DESC'
    ) => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption: sortOptionValue,
            setIsSheetOpen: mockSetIsSheetOpen,
            setIsDropDownOpen: mockSetIsDropDownOpen,
            isDropDownOpen,
        });
        (useMediaQuery as jest.Mock).mockImplementation((query) => {
            if (query === '(max-width: 768px)') {
                return isMobile;
            } else if (query === '(min-width: 769px) and (max-width: 1439px)') {
                return isMedium;
            }
        });

        return render(<SortButton />);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a Button element with the correct props and labels', () => {
        renderComponent(false, false, false, 'PRICE_ASC');
        const button = screen.getByRole('button', { name: 'Sort' });
        const expectedLabel =
            SORT_OPTIONS.find((option) => option.value === 'PRICE_ASC')
                ?.label || 'Sort';
        expect(button).toHaveTextContent(expectedLabel);
        expect(button).toHaveAttribute('aria-label', 'Sort');
    });

    it('renders SortDropdown component when screen is medium and dropdown is open', () => {
        renderComponent(false, true, true);
        expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    });

    it('does not render SortDropdown component when screen is not medium', () => {
        renderComponent(false, false, true);
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });

    it('does not render SortDropdown component when dropdown is closed', () => {
        renderComponent(false, true, false);
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });

    it('calls setIsSheetOpen with true when screen is mobile and button is clicked', () => {
        renderComponent(true);
        fireEvent.click(screen.getByRole('button', { name: 'Sort' }));
        expect(mockSetIsSheetOpen).toHaveBeenCalledWith(true);
    });
});
