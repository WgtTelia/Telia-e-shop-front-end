import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { SortDropdown } from '@/components/filters/SortDropdown';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';

import '@testing-library/jest-dom';
import { getPosition } from '@/lib/utils';

jest.mock('react-icons/io5', () => ({
    IoCheckmarkSharp: () => <span data-testid='checkmark' />,
}));

jest.mock('@/context/SortContext', () => ({
    ...jest.requireActual('@/context/SortContext'),
    useSort: jest.fn(),
    SORT_OPTIONS: [
        { label: 'Most popular' as SortOptionLabel, value: 'POPULAR_DESC' },
        {
            label: 'Price: lowest to highest' as SortOptionLabel,
            value: 'PRICE_ASC',
        },
        {
            label: 'Price: highest to lowest' as SortOptionLabel,
            value: 'PRICE_DESC',
        },
    ],
}));

describe('SortDropdown', () => {
    const mockSetSortOption = jest.fn();
    const mockSetIsDropDownOpen = jest.fn();
    let currentSortOption = 'Most popular';

    const renderComponent = (sortOption = 'Most popular') => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption,
            setSortOption: mockSetSortOption,
            setIsDropDownOpen: mockSetIsDropDownOpen,
        });

        const buttonRef = React.createRef<HTMLButtonElement>();

        return render(<SortDropdown buttonRef={buttonRef} />);
    };

    beforeEach(() => {
        currentSortOption = 'Most popular';
        (useSort as jest.Mock).mockImplementation(() => ({
            sortOption: currentSortOption,
            setSortOption: (newOption: string) => {
                mockSetSortOption(newOption);
                currentSortOption = newOption;
            },
            setIsDropDownOpen: mockSetIsDropDownOpen,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders SortDropdown with initial state', () => {
        renderComponent();
        expect(screen.getByText('Choose...')).toBeInTheDocument();
        SORT_OPTIONS.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('handles sort option change when an option is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Price: lowest to highest'));
        expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_ASC');
        expect(mockSetIsDropDownOpen).toHaveBeenCalledWith(false);
    });

    it('displays the checkmark for the initial sort option', () => {
        renderComponent('PRICE_DESC');
        expect(
            within(screen.getByText('Price: highest to lowest')).getByTestId(
                'checkmark'
            )
        ).toBeInTheDocument();
    });

    it('displays the checkmark when an option is hovered over', () => {
        renderComponent('PRICE_ASC');
        fireEvent.mouseEnter(screen.getByText('Price: lowest to highest'));
        expect(
            within(screen.getByText('Price: lowest to highest')).getByTestId(
                'checkmark'
            )
        ).toBeInTheDocument();
    });

    it('does not display the checkmark when the mouse leaves an option', () => {
        renderComponent();
        fireEvent.mouseEnter(screen.getByText('Price: lowest to highest'));
        fireEvent.mouseLeave(screen.getByText('Price: lowest to highest'));
        expect(
            within(screen.getByText('Price: lowest to highest')).queryByTestId(
                'checkmark'
            )
        ).not.toBeInTheDocument();
    });

    it('returns the correct position object', () => {
        const buttonRef = {
            current: {
                offsetTop: 100,
                offsetHeight: 50,
                offsetLeft: 200,
            } as HTMLButtonElement,
        };

        const position = getPosition(buttonRef);

        expect(position).toEqual({
            top: 150,
            left: 200,
        });
    });

    it('returns the default position object when buttonRef is not set', () => {
        const buttonRef = {
            current: null,
        };

        const position = getPosition(buttonRef);

        expect(position).toEqual({
            top: 0,
            left: 0,
        });
    });
});
