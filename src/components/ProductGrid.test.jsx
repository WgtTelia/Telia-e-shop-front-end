import { render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/mockData';

jest.mock('@/components/ProductCard', () => {
  const ProductCard = ({ productId, brandName, modelName }) => (
    <div data-testid={`product-card-${productId}`}>
      {brandName} {modelName}
    </div>
  );
  ProductCard.propTypes = {
    productId: PropTypes.number.isRequired,
    brandName: PropTypes.string.isRequired,
    modelName: PropTypes.string.isRequired,
  };
  return { ProductCard };
});

describe('ProductGrid', () => {
  it('renders a product card for each product', () => {
    render(<ProductGrid />);

    products.forEach((product) => {
      const productCard = screen.getByTestId(`product-card-${product.productId}`);
      expect(productCard).toBeInTheDocument();
    });
  });
});
