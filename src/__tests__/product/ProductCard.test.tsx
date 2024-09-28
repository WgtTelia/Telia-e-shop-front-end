import { ProductCard } from '@/components/product/ProductCard';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type ColorOption = {
    color: string;
    stockAmount: number;
    image: string;
};

const mockProps = {
    brand: 'Apple',
    id: 1,
    name: 'iPhone 13',
    productVariants: [
        {
            color: 'black',
            stockAmount: 10,
            image: '/black-iphone.jpg',
            defaultVariant: true,
            imgUrl: '/black-iphone.jpg',
            monthlyPrice: 39,
            qtyInStock: 10,
        },
        {
            color: 'white',
            stockAmount: 5,
            image: '/white-iphone.jpg',
            defaultVariant: false,
            imgUrl: '/white-iphone.jpg',
            monthlyPrice: 39,
            qtyInStock: 5,
        },
    ],
    code: 'IPHONE13',
    orderCount: 0,
    productGroup: 'phones',
    productImage: '/iphone.jpg',
    shortDescription: 'The latest iPhone with a powerful A15 Bionic chip.',
};

jest.mock('@/components/product/ColorDots', () => {
    const ColorDots = ({
        availableColors,
        onColorSelect,
    }: {
        availableColors: { color: string; index: number }[];
        onColorSelect: (index: number) => void;
    }) => (
        <div data-testid='color-dots'>
            {availableColors.map((colorOption, index) => (
                <div
                    key={colorOption.color}
                    data-testid={`color-dot-${colorOption.color}`}
                    onClick={() => onColorSelect(index)}
                >
                    {colorOption.color}
                </div>
            ))}
        </div>
    );

    return { ColorDots };
});

jest.mock('@/components/product/StockStatus', () => ({
    StockStatus: () => <div data-testid='stock-status'>Stock Status</div>,
}));

describe('ProductCard', () => {
    let selectedColor: ColorOption;

    beforeEach(() => {
        selectedColor = mockProps.productVariants[0];
    });

    it('renders the OrderNowBtn, ColorDots, and StockStatus components', () => {
        render(<ProductCard {...mockProps} />);

        const orderNowBtn = screen.getByText('Order now');
        const colorDots = screen.getByTestId('color-dots');
        const stockStatus = screen.getByTestId('stock-status');

        expect(orderNowBtn).toBeInTheDocument();
        expect(colorDots).toBeInTheDocument();
        expect(stockStatus).toBeInTheDocument();
    });

    it('renders the data for a product based on provided props', () => {
        render(<ProductCard {...mockProps} />);

        const productImage = screen.getByAltText(
            `${mockProps.brand} ${mockProps.name} ${selectedColor.color}`
        );
        const brandName = screen.getByText(mockProps.brand);
        const modelName = screen.getByText(mockProps.name);
        const shortDescription = screen.getByText(mockProps.shortDescription);
        const price = screen.getByText(
            `${mockProps.productVariants[0].monthlyPrice} €/month`
        );

        expect(productImage).toBeInTheDocument();
        expect(brandName).toBeInTheDocument();
        expect(modelName).toBeInTheDocument();
        expect(shortDescription).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    });

    it('renders correct alt tag for a selected color option', () => {
        render(<ProductCard {...mockProps} />);

        const productImage = screen.getByAltText(
            `${mockProps.brand} ${mockProps.name} ${selectedColor.color}`
        );

        expect(productImage).toHaveAttribute(
            'src',
            expect.stringMatching(
                new RegExp(`${selectedColor.color}-iphone\\.jpg`)
            )
        );
    });

    it('updates image upon selecting another color option', async () => {
        render(<ProductCard {...mockProps} />);

        mockProps.productVariants.forEach(async (colorOption) => {
            const colorDot = screen.getByTestId(
                `color-dot-${colorOption.color}`
            );

            await userEvent.click(colorDot);

            await waitFor(() => {
                const phoneImageVariant = screen.getByAltText(
                    `${mockProps.brand} ${mockProps.name} ${colorOption.color}`
                );

                expect(phoneImageVariant).toHaveAttribute(
                    'src',
                    expect.stringMatching(
                        new RegExp(`${colorOption.color}-iphone\\.jpg`)
                    )
                );
            });
        });
    });

    it('opens the PlaceOrderModal when the OrderNowBtn is clicked', async () => {
        render(<ProductCard {...mockProps} />);

        const orderNowBtn = screen.getByText('Order now');
        await userEvent.click(orderNowBtn);

        const placeOrderModal = screen.getByText('Finalise Your Order');
        expect(placeOrderModal).toBeInTheDocument();
    });
});
