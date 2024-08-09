import { render, screen } from '@testing-library/react';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/mockData';

jest.mock('@/components/ProductCard', () => ({
  ProductCard: ({ productId, brandName, modelName }) => (
    <div data-testid={`product-card-${productId}`}>
      {brandName} {modelName}
    </div>
  ),
}));

describe('ProductGrid', () => {
  it('renders a product card for each product', () => {
    render(<ProductGrid />);

    products.forEach((product) => {
      const productCard = screen.getByTestId(`product-card-${product.productId}`);
      expect(productCard).toBeInTheDocument();
    });
  });
});
