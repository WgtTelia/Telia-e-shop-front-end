'use client';
import { Error } from '@/components/apiResponseState/Error';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useFilter } from '@/context/FilterContext';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { getStockStatus } from '@/lib/utils';

export const ProductGrid: React.FC = () => {
    const { isLoading: loading, error, data: products } = useProductsQuery();
    const skeletons = [1, 2, 3, 4, 5, 6];
    const { selectedFilters } = useFilter();

    const matchesGroup = (
        product: ProductData,
        selectedFilters: FilterOptions
    ): boolean => {
        return (
            !selectedFilters.productGroups.length ||
            selectedFilters.productGroups.includes(product.productGroup)
        );
    };

    const matchesStock = (
        product: ProductData,
        selectedFilters: FilterOptions
    ): boolean => {
        if (!selectedFilters.stockOptions.length) return true;
        const stockAmount =
            product.productVariants[0]?.stock[0]?.qtyInStock ?? 0;
        const currentStockStatus = getStockStatus(stockAmount);
        return selectedFilters.stockOptions.includes(currentStockStatus);
    };

    const filteredProducts = products?.filter((product) => {
        return (
            matchesGroup(product, selectedFilters) &&
            matchesStock(product, selectedFilters)
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
