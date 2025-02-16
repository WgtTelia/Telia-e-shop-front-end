declare interface ProductData {
    id: number;
    productGroup: string; // define enum from product group?
    brand: string; // define enum from brand list?
    code: string;
    name: string;
    shortDescription: string;
    orderCount: number; 
    productVariants: ProductVariant[];
}
declare interface APIProductData {
    content: ProductData[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  }

declare interface ProductVariant {
    color: string;
    imgUrl: string;
    monthlyPrice: number;
    defaultVariant: boolean;
    stock:StockOption[];
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface ProductCardProps extends Omit<ProductData, 'code' | 'orderCount' | 'productGroup'> {
}

declare interface HeroSectionProps {
    title: string;
    description: string;
}

declare type SortOptionLabel =
    | 'Most popular'
    | 'Price: lowest to highest'
    | 'Price: highest to lowest'

declare type SortOptionValue =
    | 'POPULAR_DESC'
    | 'PRICE_ASC'
    | 'PRICE_DESC';

declare interface SortOption {
    label: SortOptionLabel;
    value: SortOptionValue;
}

declare interface StockOption {
    qtyInStock: number;
    }    

interface PriceRange {
    min: number;
    max: number;
    } 


declare interface FilterOptions {
    productGroups: string[];
    brands: string[];
    colors: string[];
    priceIntervals: string[];
    stockOptions: string[];
    }

declare interface Filter extends FilterOptions {
    isModalOpen: boolean;
    availableOptions?: FilterOptions;   
    isLoading?: boolean;
}