import { PaginationGroup } from '@/components/pagination/PaginationGroup';
import { usePagination } from '@/lib/hooks/usePagination';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('@/lib/hooks/useProductsQuery', () => ({
    useProductsQuery: jest.fn(),
}));

jest.mock('@/lib/hooks/usePagination', () => ({
    usePagination: jest.fn(),
}));

describe('PaginationGroup', () => {
    const mockReplace = jest.fn();
    const mockSearchParams = new URLSearchParams();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    });

    it('renders nothing if totalPages is 1 or less', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: [] },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [] });

        render(<PaginationGroup />);

        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('renders pagination controls when totalPages is greater than 1', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: Array(20).fill({}) },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [1, 2] });
        mockSearchParams.set('pageSize', '10');

        render(<PaginationGroup />);

        expect(screen.getByLabelText('Product pagination')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('disables the previous button on the first page', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: Array(20).fill({}) },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [1, 2] });
        mockSearchParams.set('page', '1');
        mockSearchParams.set('pageSize', '10');

        render(<PaginationGroup />);

        const prevButton = screen.getByLabelText('Go to previous page');
        expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables the next button on the last page', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: Array(20).fill({}) },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [1, 2] });
        mockSearchParams.set('page', '2');
        mockSearchParams.set('pageSize', '10');

        render(<PaginationGroup />);

        const nextButton = screen.getByLabelText('Go to next page');
        expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('navigates to the correct page when a page number is clicked', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: Array(20).fill({}) },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [1, 2] });
        mockSearchParams.set('page', '1');
        mockSearchParams.set('pageSize', '10');

        render(<PaginationGroup />);

        const page2Link = screen.getByText('2');
        fireEvent.click(page2Link);

        expect(mockReplace).toHaveBeenCalledWith('?pageSize=10&page=2', {
            scroll: false,
        });
    });

    it('does not navigate when clicking the current page', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: Array(20).fill({}) },
        });
        (usePagination as jest.Mock).mockReturnValue({ pageNumbers: [1, 2] });
        mockSearchParams.set('page', '1');
        mockSearchParams.set('pageSize', '10');

        render(<PaginationGroup />);

        const page1Link = screen.getByText('1');
        fireEvent.click(page1Link);

        expect(mockReplace).not.toHaveBeenCalled();
    });
});
