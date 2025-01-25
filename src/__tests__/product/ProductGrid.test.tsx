import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { ProductGrid } from '@/components/product/ProductGrid';
import productService from '@/lib/services/productService';

jest.mock('@/lib/services/productService');

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

describe('<ProductGrid />', () => {
    it('renders without crashing', () => {
        productService.getAll = jest.fn().mockReturnValue({
            request: Promise.resolve({ data: { content: [] } }),
            cancel: jest.fn(),
        });
        render(<ProductGrid />);
        expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    });

    it('displays products when loaded successfully', async () => {
        productService.getAll = jest.fn().mockReturnValue({
            request: Promise.resolve({ data: { content: mockProducts } }),
            cancel: jest.fn(),
        });

        render(<ProductGrid />);

        await waitFor(() => {
            expect(screen.getByText('Samsung Galaxy S22')).toBeInTheDocument();
        });
    });

    it('displays error message when loading fails', async () => {
        const errorMessage = 'Failed to fetch products';
        productService.getAll = jest.fn().mockReturnValue({
            request: Promise.reject(new Error(errorMessage)),
            cancel: jest.fn(),
        });

        render(<ProductGrid />);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
