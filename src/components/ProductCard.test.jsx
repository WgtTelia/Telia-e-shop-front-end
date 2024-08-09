import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

jest.mock('@/components/ButtonCTA', () => ({
  ButtonCTA: () => <div data-testid="button-cta">Button CTA</div>,
}));

jest.mock('@/components/ColorDots', () => ({
  ColorDots: () => <div data-testid="color-dots">Color Dots</div>,
}));

jest.mock('@/components/StockStatus', () => ({
  StockStatus: () => <div data-testid="stock-status">Stock Status</div>,
}));

const mockProps = {
  productId: '1',
  brandName: 'Apple',
  modelName: 'iPhone 13',
  productImage: 'iphone.jpg',
  availableColors: [
    { color: 'black', stockAmount: 10, image: 'black-iphone.jpg' },
    { color: 'white', stockAmount: 5, image: 'white-iphone.jpg' },
  ],
  shortDescription: 'The latest iPhone with a powerful A15 Bionic chip.',
  pricePerMonth: 39,
  productType: 'phone',
};

describe('ProductCard', () => {
  it('renders the ButtonCTA, ColorDots, and StockStatus components', () => {
    render(<ProductCard {...mockProps} />);

    const buttonCTA = screen.getByTestId('button-cta');
    const colorDots = screen.getByTestId('color-dots');
    const stockStatus = screen.getByTestId('stock-status');

    expect(buttonCTA).toBeInTheDocument();
    expect(colorDots).toBeInTheDocument();
    expect(stockStatus).toBeInTheDocument();
  });
  it('renders the correct data for the first product from mockData', () => {
    render(<ProductCard {...mockProps} />);

    const productImage = screen.getByAltText(
      `${mockProps.brandName} ${mockProps.modelName} ${mockProps.availableColors[0].color}`
    );
    const brandName = screen.getByText(mockProps.brandName);
    const modelName = screen.getByText(mockProps.modelName);
    const shortDescription = screen.getByText(mockProps.shortDescription);
    const pricePerMonth = screen.getByText(`${mockProps.pricePerMonth}€/month`);

    expect(productImage).toBeInTheDocument();
    expect(brandName).toBeInTheDocument();
    expect(modelName).toBeInTheDocument();
    expect(shortDescription).toBeInTheDocument();
    expect(pricePerMonth).toBeInTheDocument();
  });
});
