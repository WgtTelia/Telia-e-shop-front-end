declare interface ProductData {
    brand: string; // define enum from brand list?
    code: string;
    id: number;
    name: string;
    orderCount: number; 
    productGroup: string; // define enum from product group?
    productVariants: ProductVariant[];
    shortDescription: string;
}

declare interface ProductVariant {
    color: string;
    defaultVariant: boolean;
    imgUrl: string;
    monthlyPrice: number;
    qtyInStock: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface ProductCardProps extends Omit<ProductData, 'code' | 'orderCount' | 'productGroup'> {
}

declare interface HeroSectionProps {
    title: string;
    description: string;
}

declare type SortOption =
    | 'Most popular'
    | 'Price: lowest to highest'
    | 'Price: highest to lowest';
