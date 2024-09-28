import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { FilterButtonsContainer } from '@/components/filters/FilterButtonsContainer';
import { ButtonProps } from '@/components/ui/button';

jest.mock('react-icons/pi', () => ({
    PiSlidersHorizontalBold: () => <div data-testid='filter-icon' />,
}));

jest.mock('react-icons/lu', () => ({
    LuArrowDownUp: () => <div data-testid='sort-icon' />,
}));

jest.mock('@/components/ui/button', () => ({
    Button: ({
        children,
        icon,
        iconPosition = 'left',
        onClick,
    }: ButtonProps) => (
        <button onClick={onClick} data-testid='button'>
            {iconPosition === 'left' && (
                <span data-testid='button-icon'>{icon}</span>
            )}
            {children}
            {iconPosition === 'right' && (
                <span data-testid='button-icon'>{icon}</span>
            )}
        </button>
    ),
}));

jest.mock('@/components/filters/SortButton', () => ({
    SortButton: () => (
        <button data-testid='sort-button'>
            <span data-testid='sort-button-icon'>
                <div data-testid='sort-icon' />
            </span>
            Sort Button
        </button>
    ),
}));

jest.mock('@/components/modals/FilterModal', () => ({
    FilterModal: () => (
        <div>
            <button data-testid='filter-button'>
                <span data-testid='filter-button-icon'>
                    <div data-testid='filter-icon' />
                </span>
                Filter by
            </button>
            <div data-testid='filter-modal-content'>Filter Modal Content</div>
        </div>
    ),
}));

describe('FilterButtonsContainer', () => {
    it('renders the filter button with the correct icon and text', () => {
        render(<FilterButtonsContainer />);
        const filterButton = screen.getByTestId('filter-button');
        expect(filterButton).toBeInTheDocument();
        expect(
            within(filterButton).getByTestId('filter-button-icon')
        ).toBeInTheDocument();
        expect(
            within(filterButton).getByTestId('filter-icon')
        ).toBeInTheDocument();
        expect(filterButton).toHaveTextContent('Filter by');
    });

    it('renders the sort button with the correct icon and text', () => {
        render(<FilterButtonsContainer />);
        const sortButton = screen.getByTestId('sort-button');
        expect(sortButton).toBeInTheDocument();
        expect(
            within(sortButton).getByTestId('sort-button-icon')
        ).toBeInTheDocument();
        expect(within(sortButton).getByTestId('sort-icon')).toBeInTheDocument();
        expect(sortButton).toHaveTextContent('Sort Button');
    });

    it('opens the filter modal when the filter button is clicked', () => {
        render(<FilterButtonsContainer />);
        fireEvent.click(screen.getByTestId('filter-button'));
        expect(screen.getByTestId('filter-modal-content')).toBeInTheDocument();
    });
});
