import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

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

jest.mock('@/components/OrderNowBtn', () => ({
  OrderNowBtn: () => <div data-testid="order-now-btn">Order now</div>,
}));

jest.mock('@/components/ColorDots', () => ({
  ColorDots: ({ availableColors, onColorSelect }) => <div data-testid="color-dots">
    {availableColors.map((colorOption) => (
      <div
        key={colorOption.color}
        data-testid={`color-dot-${colorOption.color}`}
        onClick={() => onColorSelect(colorOption)}
      >
        {colorOption.color}
      </div>
    ))}
  </div>,
}));

jest.mock('@/components/StockStatus', () => ({
  StockStatus: () => <div data-testid="stock-status">Stock Status</div>,
}));

describe('ProductCard', () => {
  it('renders the OrderNowBtn, ColorDots, and StockStatus components', () => {
    render(<ProductCard {...mockProps} />);

    const OrderNowBtn = screen.getByTestId('order-now-btn');
    const colorDots = screen.getByTestId('color-dots');
    const stockStatus = screen.getByTestId('stock-status');

    expect(OrderNowBtn).toBeInTheDocument();
    expect(colorDots).toBeInTheDocument();
    expect(stockStatus).toBeInTheDocument();
  });

  it('renders the data for a product based on provided props', () => {
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

  it('renders correct alt tag for a selected color option', () => {
    render(<ProductCard {...mockProps} />);

    const productImage = screen.getByAltText(
      `${mockProps.brandName} ${mockProps.modelName} ${mockProps.availableColors[0].color}`
    );

    expect(productImage).toHaveAttribute('src', mockProps.availableColors[0].image);
  });

  it('updates image upon selecting another color option', () => {
    render(<ProductCard {...mockProps} />);

    mockProps.availableColors.forEach((colorOption) => {
      const colorDot = screen.getByTestId(`color-dot-${colorOption.color}`);
      fireEvent.click(colorDot);

      const phoneImage = screen.getByAltText(
        `${mockProps.brandName} ${mockProps.modelName} ${colorOption.color}`
      );

      expect(phoneImage).toHaveAttribute('src', colorOption.image);
    })


  })

});
