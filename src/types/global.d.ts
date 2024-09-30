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


    type Type = 'Mobile phones' | 'Accessories';

//mock data type,  this will be defined as an interface for Backend Data
declare type Brand = 'Samsung' | 'Xiaomi' | 'Apple' | 'OnePlus' | 'Sony';

//mock data type
declare type PriceRange =
    | '0 - 100 €/month'
    | '100 - 500 €/month'
    | '500 - 1000 €/month'
    | '1000 - 1500 €/month'
    | '1500 - 2000 €/month';

//mock data type,  this will be defined as an interface for Backend Data
declare type Color = 'Black' | 'Yellow' | 'Blue' | 'Pink' | 'Silver';

//mock data type,  this will be defined as an interface for Backend Data
declare type Stock = 'In stock' | 'Out of stock';
