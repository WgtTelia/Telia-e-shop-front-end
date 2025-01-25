import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';

jest.mock('@/lib/hooks/useProductsQuery.ts');

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
                stock: [
                    {
                        qtyInStock: 10,
                    },
                ],
            },
        ],
    },
];

const queryClient = new QueryClient();

describe('<ProductGrid />', () => {
    it('renders without crashing', () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <ProductGrid />
            </QueryClientProvider>
        );

        expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    });

    it('displays products when loaded successfully', async () => {
        (useProductsQuery as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <ProductGrid />
            </QueryClientProvider>
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

        render(
            <QueryClientProvider client={queryClient}>
                <ProductGrid />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
