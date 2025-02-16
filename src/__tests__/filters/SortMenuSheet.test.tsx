import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SortMenuSheet } from '@/components/filters/SortMenuSheet';
import '@testing-library/jest-dom';
import { SORT_OPTIONS, SortProvider, useSort } from '@/context/SortContext';

jest.mock('react-icons/fa', () => ({
    FaChevronUp: () => <span data-testid='chevron-up' />,
    FaChevronDown: () => <span data-testid='chevron-down' />,
}));

jest.mock('@/components/filters/OptionPicker', () => ({
    OptionPicker: ({
        options,
        selectedOption,
        onChange,
    }: {
        options: SortOption[];
        selectedOption: SortOptionValue;
        onChange: (option: SortOption) => void;
    }) => (
        <div data-testid='picker'>
            {options.map((option) => (
                <div
                    key={option.value}
                    data-testid={`picker-option-${option.value}`}
                    style={{
                        backgroundColor:
                            option.value === selectedOption
                                ? 'yellow'
                                : 'transparent',
                    }}
                    onClick={() => onChange(option)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    ),
}));

jest.mock('@/context/SortContext', () => ({
    ...jest.requireActual('@/context/SortContext'),
    useSort: jest.fn(),
}));

describe('SortMenuSheet', () => {
    const mockSetSortOption = jest.fn();
    const mockSetIsSheetOpen = jest.fn();
    let currentSortOptionValue: SortOptionValue = 'POPULAR_DESC';

    const renderComponent = (
        sortOptionValue: SortOptionValue = 'POPULAR_DESC',
        isSheetOpen = true
    ) => {
        (useSort as jest.Mock).mockReturnValue({
            sortOption: sortOptionValue,
            setSortOption: mockSetSortOption,
            isSheetOpen,
            setIsSheetOpen: mockSetIsSheetOpen,
        });

        return render(
            <SortProvider>
                <SortMenuSheet />
            </SortProvider>
        );
    };

    beforeEach(() => {
        currentSortOptionValue = 'POPULAR_DESC';
        (useSort as jest.Mock).mockImplementation(() => ({
            sortOption: currentSortOptionValue,
            setSortOption: (newOption: SortOptionValue) => {
                mockSetSortOption(newOption);
                currentSortOptionValue = newOption;
            },
            isSheetOpen: true,
            setIsSheetOpen: mockSetIsSheetOpen,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders SortMenuSheet with initial state', () => {
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

        expect(screen.getByText('Most popular')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('chevron-up'));
        await waitFor(() => {
            expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_DESC');
        });

        fireEvent.click(screen.getByTestId('chevron-down'));
        await waitFor(() => {
            expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_DESC');
        });
    });

    it('closes the sheet when the "Done" button is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByRole('button', { name: 'Done' }));
        expect(mockSetIsSheetOpen).toHaveBeenCalledWith(false);
    });

    it('triggers option change when a picker option is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('picker-option-PRICE_ASC'));
        expect(mockSetSortOption).toHaveBeenCalledWith('PRICE_ASC');
    });

    it('renders Picker component with correct options and selected option', () => {
        renderComponent();
        SORT_OPTIONS.forEach((option) => {
            expect(
                screen.getByTestId(`picker-option-${option.value}`)
            ).toBeInTheDocument();
        });
    });
});
