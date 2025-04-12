import {
    defaultItemsPerPage,
    ResultsPerPageSelector,
} from '@/components/pagination/ResultsPerPageSelector';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('ResultsPerPageSelector', () => {
    const mockPush = jest.fn();
    const mockSearchParams = new URLSearchParams();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    });

    it('renders with default options and selected defaultItemsPerPage', () => {
        render(<ResultsPerPageSelector />);

        expect(screen.getByText('Results per page:')).toBeInTheDocument();
        expect(screen.getByText(defaultItemsPerPage)).toBeInTheDocument();
    });

    it('opens and closes the dropdown when the button is clicked', () => {
        render(<ResultsPerPageSelector />);

        const button = screen.getByTestId('items-per-page-button');
        fireEvent.click(button);

        expect(screen.getByTestId('dropdown')).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });

    it('updates selectedItemsPerPage when an option is clicked', () => {
        render(<ResultsPerPageSelector />);

        const button = screen.getByTestId('items-per-page-button');
        fireEvent.click(button);

        const option = screen.getByText('6');
        fireEvent.click(option);

        expect(mockPush).toHaveBeenCalledWith('?pageSize=6&page=1', {
            scroll: false,
        });
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });

    it('closes the dropdown when clicking outside', () => {
        render(<ResultsPerPageSelector />);

        const button = screen.getByTestId('items-per-page-button');
        fireEvent.click(button);

        expect(screen.getByTestId('dropdown')).toBeInTheDocument();

        fireEvent.mouseDown(document);
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });

    it('syncs selectedItemsPerPage with the URL parameter', () => {
        mockSearchParams.set('pageSize', '9');

        render(<ResultsPerPageSelector />);

        expect(screen.getByText('9')).toBeInTheDocument();
    });

    it('does not update selectedItemsPerPage if the URL parameter matches the current value', () => {
        mockSearchParams.set('pageSize', String(defaultItemsPerPage));

        render(<ResultsPerPageSelector />);

        expect(screen.getByText(defaultItemsPerPage)).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });
});
