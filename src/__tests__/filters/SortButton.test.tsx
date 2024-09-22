import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SortButton } from '@/components/filters/SortButton';
import { useSort } from '@/context/SortContext';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

jest.mock('@/context/SortContext', () => ({
    useSort: jest.fn(),
}));

jest.mock('@/lib/hooks/useMediaQuery', () => ({
    useMediaQuery: jest.fn(),
}));

describe('SortButton', () => {
    const mockSetIsSheetOpen = jest.fn();
    const mockSetIsDropDownOpen = jest.fn();

    const renderComponent = (
        isMobile = false,
        isMedium = false,
        isDropDownOpen = false
    ) => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption: 'Most popular',
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

    it('renders a Button element with the correct props', () => {
        renderComponent();
        const button = screen.getByRole('button', { name: 'Sort' });
        expect(button).toHaveTextContent('Most popular');
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
