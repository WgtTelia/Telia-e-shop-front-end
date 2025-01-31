import { useFilter } from '@/context/FilterContext';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useMemo } from 'react';
import {
    getStockStatus,
    isWithinPriceRange,
    parsePriceInterval,
} from '@/lib/utils';

const matchesGroup = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.productGroups.length ||
    selectedFilters.productGroups.includes(product.productGroup);

const matchesBrand = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.brands.length ||
    selectedFilters.brands.includes(product.brand);

export const matchesPrice = (
    product: ProductData,
    selectedFilters: FilterOptions
): boolean => {
    if (!selectedFilters.priceIntervals.length) return true;

    return selectedFilters.priceIntervals.some((interval) => {
        const range = parsePriceInterval(interval);
        if (!range) return false;

        return product.productVariants.some((variant) =>
            isWithinPriceRange(variant.monthlyPrice, range)
        );
    });
};

const matchesColor = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.colors.length ||
    product.productVariants.some((variant) =>
        selectedFilters.colors.includes(variant.color)
    );

export const matchesStock = (
    product: ProductData,
    selectedFilters: FilterOptions
): boolean => {
    if (!selectedFilters.stockOptions.length) return true;

    const stockAmount = product.productVariants[0]?.stock[0]?.qtyInStock ?? 0;
    const currentStockStatus = getStockStatus(stockAmount);

    return selectedFilters.stockOptions.includes(currentStockStatus);
};

export const useFilteredProducts = () => {
    const { selectedFilters } = useFilter();
    const { data: products } = useProductsQuery();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter(
            (product) =>
                matchesGroup(product, selectedFilters) &&
                matchesBrand(product, selectedFilters) &&
                matchesPrice(product, selectedFilters) &&
                matchesColor(product, selectedFilters) &&
                matchesStock(product, selectedFilters)
        );
    }, [products, selectedFilters]);

    return { filteredProducts };
};
