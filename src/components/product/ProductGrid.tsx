'use client';
import React, { useEffect, useState } from 'react';

import { CanceledError } from '@/lib/services/apiClient';
import { Error } from '@/components/apiResponseState/Error';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import productService from '@/lib/services/productService';

export const ProductGrid: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState<ProductData[]>([]);
    const skeletons = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const { request, cancel } = productService.getObject<APIProductData>();
        request
            .then((response) => {
                setProducts(response.data.content);
            })
            .catch((error) => {
                if (error instanceof CanceledError) return;
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => cancel();
    }, []);

    return (
        <div
            data-testid='product-grid'
            className='grid grid-cols-card-grid justify-center gap-6'
        >
            {error && <Error>{error}</Error>}
            {loading &&
                skeletons.map((skeleton) => (
                    <ProductCardSkeleton key={skeleton} />
                ))}
            {products.map((product: ProductCardProps) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
};
