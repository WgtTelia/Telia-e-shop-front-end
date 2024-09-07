import { render, screen } from '@testing-library/react';
import { products } from '@/data/mockData';
import { ProductGrid } from '@/components/product/ProductGrid';

jest.mock('@/components/product/ProductCard', () => {
  const ProductCard = ({
    productId,
    brandName,
    modelName,
  }: ProductCardProps) => (
    <div data-testid={`product-card-${productId}`}>
      {brandName} {modelName}
    </div>
  );
  return { ProductCard };
});

describe('ProductGrid', () => {
  it('renders a product card for each product', () => {
    render(<ProductGrid />);

    products.forEach((product) => {
      const productCard = screen.getByTestId(
        `product-card-${product.productId}`
      );
      expect(productCard).toBeInTheDocument();
    });
  });
});
