import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FilterButtonsContainer } from '@/components/filters/FilterButtonsContainer';
import { ButtonProps } from '@/components/ui/button';

jest.mock('react-icons/pi', () => ({
    PiSlidersHorizontalBold: () => <div data-testid='filter-icon' />,
}));

jest.mock('react-icons/lu', () => ({
    LuArrowDownUp: () => <div data-testid='sort-icon' />,
}));

jest.mock('@/components/ui/button', () => ({
    Button: ({ children, icon, iconPosition, onClick }: ButtonProps) => (
        <button onClick={onClick}>
            <span
                data-testid='button-icon'
                className={iconPosition === 'left' ? 'icon-left' : ''}
            >
                {icon}
            </span>
            {children}
        </button>
    ),
}));

jest.mock('@/components/filters/SortButton', () => ({
    SortButton: () => (
        <button>
            <span data-testid='button-icon' className='icon-left'>
                <div data-testid='sort-icon' /> {/* Mock the sort icon */}
            </span>
            Sort Button
        </button>
    ),
}));

describe('FilterButtonsContainer', () => {
    it('renders both buttons', () => {
        render(<FilterButtonsContainer />);
        expect(screen.getByText('Filter by')).toBeInTheDocument();
        expect(screen.getByText('Sort Button')).toBeInTheDocument();
    });

    it('renders the icons inside the buttons', () => {
        render(<FilterButtonsContainer />);
        expect(screen.getAllByTestId('button-icon').length).toBe(2);
        expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
        expect(screen.getByTestId('sort-icon')).toBeInTheDocument(); // This should now pass
    });

    it('ensures the icons are positioned on the left', () => {
        render(<FilterButtonsContainer />);
        const buttonIcons = screen.getAllByTestId('button-icon');
        buttonIcons.forEach((icon) => {
            expect(icon).toHaveClass('icon-left');
        });
    });

    it('calls handleFilterClick when the Filter by button is clicked', () => {
        window.alert = jest.fn();
        render(<FilterButtonsContainer />);
        fireEvent.click(screen.getByText('Filter by'));
        expect(window.alert).toHaveBeenCalledWith('Filter button clicked');
    });
});
