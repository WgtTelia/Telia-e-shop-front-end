'use client';
import { Error } from '@/components/apiResponseState/Error';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useFilteredProducts } from '@/lib/hooks/useFilteredProduct';
import { useSearchParams } from 'next/navigation';
import {
    getStockStatus,
    isWithinPriceRange,
    parsePriceInterval,
} from '@/lib/utils';

export const ProductGrid: React.FC = () => {
    const { isLoading: loading, error, data: products } = useProductsQuery();
    // const { filteredProducts } = useFilteredProducts();
    const searchParams = useSearchParams();
    const skeletons = [1, 2, 3, 4, 5, 6];

    const filteredProducts = products?.filter((product) => {
        const groupMatch =
            !searchParams.getAll('productGroups').length ||
            searchParams.getAll('productGroups').includes(product.productGroup);
        const brandMatch =
            !searchParams.getAll('brands').length ||
            searchParams.getAll('brands').includes(product.brand);
        const colorMatch =
            !searchParams.getAll('colors').length ||
            product.productVariants.some((variant) =>
                searchParams.getAll('colors').includes(variant.color)
            );
        const priceMatch =
            !searchParams.getAll('priceIntervals').length ||
            searchParams.getAll('priceIntervals').some((interval) => {
                const range = parsePriceInterval(interval);
                return (
                    range &&
                    product.productVariants.some((variant) =>
                        isWithinPriceRange(variant.monthlyPrice, range)
                    )
                );
            });
        const stockMatch =
            !searchParams.getAll('stockOptions').length ||
            searchParams.getAll('stockOptions').some((stockOption) => {
                const stockAmount =
                    product.productVariants[0]?.stock[0]?.qtyInStock ?? 0;
                const currentStockStatus = getStockStatus(stockAmount);
                return stockOption === currentStockStatus;
            });
        return (
            groupMatch && brandMatch && colorMatch && priceMatch && stockMatch
        );
    });

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
