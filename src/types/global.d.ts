interface ColorOption {
    color: string;
    stockAmount: number;
    image?: string;
}
declare interface ProductCardProps {
    productId: number;
    brandName: string;
    modelName: string;
    productImage: string;
    availableColors: ColorOption[];
    shortDescription: string;
    pricePerMonth: number;
    productType: string;
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
