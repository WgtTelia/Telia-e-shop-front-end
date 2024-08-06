import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import productData from '@/data/products.json';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it('renders product images correctly', () => {
    render(<Home />);
    productData.forEach((product) => {
      const imageElement = screen.getByAltText(product.model);
      expect(imageElement).toBeInTheDocument();
    });
  });

  it('renders product images with correct alt text', () => {
    render(<Home />);
    productData.forEach((product) => {
      const imageElement = screen.getByAltText(product.model);
      expect(imageElement).toHaveAttribute('alt', product.model);
    });
  });
});
