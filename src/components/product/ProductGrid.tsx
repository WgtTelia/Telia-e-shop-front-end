'use client';
import { Error } from '@/components/apiResponseState/Error';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useFilteredProductsByStock } from '@/lib/hooks/useFilteredProductsByStock';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { NoResults } from '@/components/filters/NoResults';

export const ProductGrid: React.FC = () => {
    const { isLoading: loading, error } = useProductsQuery();
    const { filteredProducts } = useFilteredProductsByStock();
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
            {filteredProducts && filteredProducts.length === 0 && (
                <NoResults
                    message="Oops! We couldn't find any products matching your current filters."
                    suggestion='Consider removing some filters or trying different categories.'
                />
            )}
        </div>
    );
};
