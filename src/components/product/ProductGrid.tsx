'use client';
import { Error } from '@/components/apiResponseState/Error';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useFilteredProducts } from '@/lib/hooks/useFilteredProduct';

export const ProductGrid: React.FC = () => {
    const { isLoading: loading, error, data: products } = useProductsQuery();
    const { filteredProducts } = useFilteredProducts();
    const skeletons = [1, 2, 3, 4, 5, 6];

    return (
        <div
            data-testid='product-grid'
            className='grid grid-cols-card-grid justify-center gap-6'
        >
            {error && <Error>{error.message}</Error>}
            {loading &&
                skeletons.map((skeleton) => (
                    <ProductCardSkeleton key={skeleton} />
                ))}
            {filteredProducts &&
                filteredProducts.map((product: ProductCardProps) => (
                    <ProductCard key={product.id} {...product} />
                ))}
        </div>
    );
};
