import { ProductCard } from '@/components/product/ProductCard';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProps = {
    id: 2,
    productGroup: 'Mobile phones',
    brand: 'Xiaomi',
    code: 'TES1010XIAO 14',
    name: 'Xiaomi 14',
    shortDescription:
        'A mid-range smartphone with a large display and a powerful camera.',
    orderCount: 27,
    productVariants: [
        {
            color: 'Black',
            imgUrl: '/images/xiaomi-14-black.png',
            monthlyPrice: 24.92,
            defaultVariant: true,
            stock: [
                {
                    qtyInStock: 1,
                },
            ],
        },
        {
            color: 'Green',
            imgUrl: '/images/xiaomi-14-green.png',
            monthlyPrice: 24.92,
            defaultVariant: false,
            stock: [
                {
                    qtyInStock: 20,
                },
            ],
        },
        {
            color: 'White',
            imgUrl: '/images/xiaomi-14-white.png',
            monthlyPrice: 24.92,
            defaultVariant: false,
            stock: [
                {
                    qtyInStock: 10,
                },
            ],
        },
    ],
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
    let selectedColor: ProductVariant;

    beforeEach(() => {
        selectedColor = {
            color: mockProps.productVariants[0].color,
            imgUrl: mockProps.productVariants[0].imgUrl,
            monthlyPrice: mockProps.productVariants[0].monthlyPrice,
            defaultVariant: mockProps.productVariants[0].defaultVariant,
            stock: [
                {
                    qtyInStock:
                        mockProps.productVariants[0].stock[0].qtyInStock,
                },
            ],
        } as const;
    });

    it('renders the ColorDots, and StockStatus components', async () => {
        render(<ProductCard {...mockProps} />);

        const colorDots = screen.getByTestId('color-dots');
        const stockStatus = screen.getByTestId('stock-status');

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
            'alt',
            expect.stringMatching(new RegExp(`${selectedColor.color}`))
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

        const placeOrderModal = await screen.findByText('Finalise Your Order');
        expect(placeOrderModal).toBeInTheDocument();
    });
});
