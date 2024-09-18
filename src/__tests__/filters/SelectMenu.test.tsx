import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SelectMenu, SORT_OPTIONS } from '@/components/filters/SelectMenu';

import '@testing-library/jest-dom';
import { SortProvider, useSort } from '@/context/SortContext';

// Mocking icons
jest.mock('react-icons/fa', () => ({
  FaChevronUp: () => <span data-testid='chevron-up' />,
  FaChevronDown: () => <span data-testid='chevron-down' />,
}));

// Mocking Picker component
jest.mock('@/components/filters/Picker', () => ({
  Picker: ({
    options,
    selectedOption,
    onChange,
  }: {
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
  }) => (
    <div data-testid='picker'>
      {options.map((option) => (
        <div
          key={option}
          data-testid={`picker-option-${option}`}
          style={{
            backgroundColor:
              option === selectedOption ? 'yellow' : 'transparent',
          }}
          onClick={() => onChange(option)}
        >
          {option}
        </div>
      ))}
    </div>
  ),
}));

// Mocking useSort hook
jest.mock('@/context/SortContext', () => ({
  ...jest.requireActual('@/context/SortContext'),
  useSort: jest.fn(),
}));

describe('SelectMenu', () => {
  const mockSetSortOption = jest.fn();
  const mockSetIsSheetOpen = jest.fn();
  let currentSortOption = 'Most popular';

  const renderComponent = (sortOption = 'Most popular', isSheetOpen = true) => {
    (useSort as jest.Mock).mockReturnValue({
      sortOption,
      setSortOption: mockSetSortOption,
      isSheetOpen,
      setIsSheetOpen: mockSetIsSheetOpen,
    });

    return render(
      <SortProvider>
        <SelectMenu />
      </SortProvider>
    );
  };

  beforeEach(() => {
    currentSortOption = 'Most popular';
    (useSort as jest.Mock).mockImplementation(() => ({
      sortOption: currentSortOption,
      setSortOption: (newOption: string) => {
        mockSetSortOption(newOption);
        currentSortOption = newOption;
      },
      isSheetOpen: true,
      setIsSheetOpen: mockSetIsSheetOpen,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders SelectMenu with initial state', () => {
    renderComponent();
    expect(screen.getByText('Choose...')).toBeInTheDocument();
    expect(screen.getByText('Most popular')).toBeInTheDocument();
  });

  it('renders chevrons correctly', () => {
    renderComponent();
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('moves selection up and down when chevrons are clicked', async () => {
    renderComponent();

    // Initial state check
    expect(screen.getByText('Most popular')).toBeInTheDocument();

    // Click chevron up
    fireEvent.click(screen.getByTestId('chevron-up'));
    await waitFor(() => {
      // Check if the selection has moved up
      expect(mockSetSortOption).toHaveBeenCalledWith(
        'Price: highest to lowest'
      );
    });

    // Click chevron down
    fireEvent.click(screen.getByTestId('chevron-down'));
    await waitFor(() => {
      // Check if the selection has moved down
      expect(mockSetSortOption).toHaveBeenCalledWith(
        'Price: lowest to highest'
      );
    });
  });

  it('closes the sheet when the "Done" button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(mockSetIsSheetOpen).toHaveBeenCalledWith(false);
  });

  it('triggers option change when a picker option is clicked', () => {
    renderComponent();
    fireEvent.click(
      screen.getByTestId('picker-option-Price: lowest to highest')
    );
    expect(mockSetSortOption).toHaveBeenCalledWith('Price: lowest to highest');
  });

  it('renders Picker component with correct options and selected option', () => {
    renderComponent();
    SORT_OPTIONS.forEach((option) => {
      expect(screen.getByTestId(`picker-option-${option}`)).toBeInTheDocument();
    });
  });
});
