declare interface ColorOption {
  color: string;
  stockAmount: number;
}
declare interface ProductCardProps {
  brandName: string;
  modelName: string;
  availableColors: ColorOption[];
  shortDescription: string;
  pricePerMonth: number;
}
