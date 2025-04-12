import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterProvider } from '@/context/FilterContext';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

jest.mock('@/lib/hooks/useProductsQuery.ts');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const createWrapper = () => {
    const queryClient = new QueryClient();

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <FilterProvider>{children}</FilterProvider>
        </QueryClientProvider>
    );
    Wrapper.displayName = 'Wrapper';
    return Wrapper;
};

const mockProducts = [
    {
        id: 1,
        productGroup: 'Mobile phones',
        brand: 'Samsung',
        code: 'TES1010SAMS S901',
        name: 'Samsung Galaxy S22',
        shortDescription:
            'A feature-packed Galaxy smartphone with a sleek design and a high-quality camera.',
        orderCount: 46,
        productVariants: [
            {
                color: 'Black',
                imgUrl: '/images/samsung-galaxy-s22-black.png',
                monthlyPrice: 19.13,
                defaultVariant: false,
                stock: [{ qtyInStock: 10 }],
            },
        ],
    },
];

describe('<ProductGrid />', () => {
    beforeEach(() => {
        // Mock Next.js navigation hooks
        mockUseRouter.mockReturnValue({
            replace: jest.fn(),
            push: jest.fn(),
        });
        mockUsePathname.mockReturnValue('/products');
        mockUseSearchParams.mockReturnValue(new URLSearchParams());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: [] },
            isLoading: false,
            error: null,
        });

        const Wrapper = createWrapper();
        render(
            <Wrapper>
                <ProductGrid />
            </Wrapper>
        );

        expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    });

    it('displays products when loaded successfully', async () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: { content: mockProducts },
            isLoading: false,
            error: null,
        });

        const Wrapper = createWrapper();
        render(
            <Wrapper>
                <ProductGrid />
            </Wrapper>
        );

        await waitFor(() => {
            expect(screen.getByText('Samsung Galaxy S22')).toBeInTheDocument();
        });
    });

    it('displays error message when loading fails', async () => {
        const errorMessage = 'Failed to fetch products';
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: new Error(errorMessage),
        });

        const Wrapper = createWrapper();
        render(
            <Wrapper>
                <ProductGrid />
            </Wrapper>
        );

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
