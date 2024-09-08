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
