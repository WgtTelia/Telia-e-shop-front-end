import { OptionPicker } from '@/components/filters/OptionPicker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockSortOptions: SortOptionType[] = [
    { label: 'Most popular' as SortOptionLabel, value: 'POPULAR_DESC' },
    {
        label: 'Price: lowest to highest' as SortOptionLabel,
        value: 'PRICE_ASC',
    },
    {
        label: 'Price: highest to lowest' as SortOptionLabel,
        value: 'PRICE_DESC',
    },
];
const mockOnChange = jest.fn();

describe('OptionPicker Component', () => {
    it('renders all options', () => {
        render(
            <OptionPicker
                options={mockSortOptions}
                selectedOption='POPULAR_DESC'
                onChange={mockOnChange}
            />
        );

        mockSortOptions.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('applies correct styles for selected option', () => {
        render(
            <OptionPicker
                options={mockSortOptions}
                selectedOption='PRICE_ASC'
                onChange={mockOnChange}
            />
        );

        const selectedOption = screen.getByText('Price: lowest to highest');
        expect(selectedOption).toHaveClass('bg-gray-600 text-white');

        const nonSelectedOption = screen.getByText('Most popular');
        expect(nonSelectedOption).toHaveClass('text-gray-550');
    });

    it('scrolls to the correct position when an option is clicked', async () => {
        const scrollToMock = jest.fn();
        window.HTMLElement.prototype.scrollTo = scrollToMock;

        render(
            <OptionPicker
                options={mockSortOptions}
                selectedOption='PRICE_DESC'
                onChange={mockOnChange}
            />
        );

        const optionToClick = screen.getByText('Price: highest to lowest');
        await userEvent.click(optionToClick);

        expect(scrollToMock).toHaveBeenCalledWith({
            top: 48,
            behavior: 'smooth',
        });
    });
    it('calls onChange and scrolls to the selected option on click', async () => {
        render(
            <OptionPicker
                options={mockSortOptions}
                selectedOption='POPULAR_DESC'
                onChange={mockOnChange}
            />
        );

        const optionToClick = screen.getByText('Price: highest to lowest');
        await userEvent.click(optionToClick);

        expect(mockOnChange).toHaveBeenCalledWith(mockSortOptions[2]);
    });
});
