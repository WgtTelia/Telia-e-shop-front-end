import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ButtonProps } from '@/components/ui/button';
import FilterButtonsContainer from '@/components/filters/FilterButtonsContainer';

jest.mock('react-icons/pi', () => ({
  PiSlidersHorizontalBold: () => <div data-testid='filter-icon' />,
}));
jest.mock('react-icons/lu', () => ({
  LuArrowDownUp: () => <div data-testid='sort-icon' />,
}));

jest.mock('../../components/ui/button', () => ({
  Button: ({ children, icon, iconPosition }: ButtonProps) => (
    <button>
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

describe('FilterButtonsContainer', () => {
  it('should render both buttons', () => {
    render(<FilterButtonsContainer />);

    expect(screen.getByText('Filter by')).toBeInTheDocument();
    expect(screen.getByText('Most popular')).toBeInTheDocument();
  });

  it('should render the icons inside the buttons', () => {
    render(<FilterButtonsContainer />);

    expect(screen.getAllByTestId('button-icon').length).toBe(2);
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('sort-icon')).toBeInTheDocument();
  });

  it('should ensure the icons are positioned on the left', () => {
    render(<FilterButtonsContainer />);

    const buttonIcons = screen.getAllByTestId('button-icon');
    buttonIcons.forEach((icon) => {
      expect(icon).toHaveClass('icon-left');
    });
  });
});
