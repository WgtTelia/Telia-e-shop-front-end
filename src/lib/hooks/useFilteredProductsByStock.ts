// This hook is used to filter products based on stock status and selected filters. This is essential and has been implemented on the Frontend, as Backend luck this functionality. The hook uses the useFilter hook to get the selected filters and the useProductsQuery hook to get the products. The matchesStock function is used to filter the products based on the stock status. The filteredProducts array is then returned along with the isLoading and error states.
import { useFilter } from '@/context/FilterContext';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { getStockStatus } from '@/lib/utils';

export const useFilteredProductsByStock = () => {
    const { selectedFilters } = useFilter();
    const { data: products, isLoading, error } = useProductsQuery();

    const matchesStock = (product: ProductData): boolean => {
        if (!selectedFilters.stockOptions.length) return true;

        const stockAmount =
            product.productVariants[0]?.stock[0]?.qtyInStock ?? 0;
        const currentStockStatus = getStockStatus(stockAmount);

        return selectedFilters.stockOptions.includes(currentStockStatus);
    };

    const filteredProducts = products?.content?.filter((product) => {
        return matchesStock(product);
    });

    return { filteredProducts, isLoading, error };
};
