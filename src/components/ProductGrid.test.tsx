import { render, screen } from '@testing-library/react';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/mockData';

jest.mock('@/components/ProductCard', () => {
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
