import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { ProductGrid } from '@/components/product/ProductGrid';
import productService from '@/lib/services/productService';

// Define the type of productService.getAll as a jest mock function
jest.mock('@/lib/services/productService', () => ({
    getAll: jest.fn(() => ({
        request: Promise.resolve({ data: [] }),
        cancel: jest.fn(),
    })),
}));

describe('ProductGrid', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders product cards when the database call is successful', async () => {
        const products = [
            {
                id: 1,
                brand: 'Chinesium',
                name: 'Product 1',
                src: 'product-1.jpg',
                price: 10,
                productVariants: [
                    {
                        color: 'green',
                    },
                ],
            },
            {
                id: 2,
                brand: 'Best phone',
                name: 'Product 2',
                src: 'product-2.jpg',
                price: 20,
                productVariants: [
                    {
                        color: 'red',
                    },
                ],
            },
        ];

        // Mock the successful response
        (productService.getAll as jest.Mock).mockReturnValueOnce({
            request: Promise.resolve({ data: products }),
            cancel: jest.fn(),
        });

        render(<ProductGrid />);

        // Wait for the products to be rendered
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        // Check if the loader is no longer rendered
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});
