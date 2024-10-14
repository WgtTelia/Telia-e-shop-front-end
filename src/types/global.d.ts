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
    stock: {
        qtyInStock: number;
    }[];
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


type Type = string;

//mock data type,  this will be defined as an interface for Backend Data
declare type Brand =string;

//mock data type
declare type PriceRange = string;

//mock data type,  this will be defined as an interface for Backend Data
declare type Color =  string;

//mock data type,  this will be defined as an interface for Backend Data
declare type Stock = string;


declare interface Filter {
    types: Type[];
    brands: Brand[];
    priceRanges: PriceRange[];
    colors: Color[];
    stock: Stock[];
    isModalOpen: boolean;
    availableOptions?: { 
        types: string[];
        brands: string[];
        priceRanges: string[];
        colors: string[];
    }

}