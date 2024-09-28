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

    it('renders loader and then product cards when the database call is successful', async () => {
        const products = [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                productVariants: [
                    {
                        color: 'green',
                    },
                ],
            },
            {
                id: 2,
                name: 'Product 2',
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

        // Check if the loader is rendered
        expect(screen.getByText('Loading...')).toBeInTheDocument();

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

    // Rest of your test code...
});
