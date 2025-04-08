'use client';
import { Error } from '@/components/apiResponseState/Error';
import { NoResults } from '@/components/filters/NoResults';
import { defaultItemsPerPage } from '@/components/pagination/ResultsPerPageSelector'; // Import the constant
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useFilteredProductsByStock } from '@/lib/hooks/useFilteredProductsByStock';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useSearchParams } from 'next/navigation';

export const ProductGrid: React.FC = () => {
    const { isLoading: loading, error } = useProductsQuery();
    const { filteredProducts } = useFilteredProductsByStock();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page')
        ? parseInt(searchParams.get('page') as string)
        : 1;
    const pageSizeParam = searchParams.get('pageSize');
    const itemsPerPage = pageSizeParam
        ? parseInt(pageSizeParam)
        : defaultItemsPerPage;
    const skeletons = [1, 2, 3, 4, 5, 6];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsOnCurrentPage =
        filteredProducts?.slice(startIndex, endIndex) || [];

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
            {productsOnCurrentPage.map((product: ProductCardProps) => (
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
