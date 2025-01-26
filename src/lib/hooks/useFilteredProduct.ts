import { useFilter } from '@/context/FilterContext';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useMemo } from 'react';

const matchesGroup = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.productGroups.length ||
    selectedFilters.productGroups.includes(product.productGroup);

const matchesBrand = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.brands.length ||
    selectedFilters.brands.includes(product.brand);

const matchesPrice = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.priceIntervals.length ||
    selectedFilters.priceIntervals.some((interval) => {
        const [min, max] = interval.split('-').map(Number);
        const monthlyPrice = parseFloat(
            product.productVariants[0].monthlyPrice.toString()
        );
        return monthlyPrice >= min && monthlyPrice <= max;
    });

const matchesColor = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.colors.length ||
    product.productVariants.some((variant) =>
        selectedFilters.colors.includes(variant.color)
    );

const matchesStock = (product: ProductData, selectedFilters: FilterOptions) =>
    !selectedFilters.stockOptions.length ||
    selectedFilters.stockOptions.some((option) => {
        const stockAmount = product.productVariants[0].stock[0].qtyInStock;
        switch (option) {
            case 'inStock':
                return stockAmount > 0;
            case 'outOfStock':
                return stockAmount === 0;
            default:
                return true;
        }
    });

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
