    interface ColorOption {
  color: string;
  stockAmount: number;
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
