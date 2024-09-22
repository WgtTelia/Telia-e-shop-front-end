import { ProductCard } from '@/components/product/ProductCard'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockProps = {
  productId: 1,
  brandName: 'Apple',
  modelName: 'iPhone 13',
  productImage: '/iphone.jpg',
  availableColors: [
    { color: 'black', stockAmount: 10, image: '/black-iphone.jpg' },
    { color: 'white', stockAmount: 5, image: '/white-iphone.jpg' },
  ],
  shortDescription: 'The latest iPhone with a powerful A15 Bionic chip.',
  pricePerMonth: 39,
  productType: 'phone',
}

jest.mock('@/components/product/ColorDots', () => {
  const ColorDots = ({
    availableColors,
  }: {
    availableColors: ColorOption[]
  }) => (
    <div data-testid='color-dots'>
      {availableColors.map((colorOption) => (
        <div
          key={colorOption.color}
          data-testid={`color-dot-${colorOption.color}`}
        >
          {colorOption.color}
        </div>
      ))}
    </div>
  )

  return { ColorDots }
})

jest.mock('@/components/product/StockStatus', () => ({
  StockStatus: () => <div data-testid='stock-status'>Stock Status</div>,
}))

describe('ProductCard', () => {
  let selectedColor: ColorOption

  beforeEach(() => {
    selectedColor = mockProps.availableColors[0]
  })

  it('renders the OrderNowBtn, ColorDots, and StockStatus components', () => {
    render(<ProductCard {...mockProps} />)

    const orderNowBtn = screen.getByText('Order now')
    const colorDots = screen.getByTestId('color-dots')
    const stockStatus = screen.getByTestId('stock-status')

    expect(orderNowBtn).toBeInTheDocument()
    expect(colorDots).toBeInTheDocument()
    expect(stockStatus).toBeInTheDocument()
  })

  it('renders the data for a product based on provided props', () => {
    render(<ProductCard {...mockProps} />)

    const productImage = screen.getByAltText(
      `${mockProps.brandName} ${mockProps.modelName} ${selectedColor.color}`
    )
    const brandName = screen.getByText(mockProps.brandName)
    const modelName = screen.getByText(mockProps.modelName)
    const shortDescription = screen.getByText(mockProps.shortDescription)
    const pricePerMonth = screen.getByText(`${mockProps.pricePerMonth}€/month`)

    expect(productImage).toBeInTheDocument()
    expect(brandName).toBeInTheDocument()
    expect(modelName).toBeInTheDocument()
    expect(shortDescription).toBeInTheDocument()
    expect(pricePerMonth).toBeInTheDocument()
  })

  it('renders correct alt tag for a selected color option', () => {
    render(<ProductCard {...mockProps} />)

    const productImage = screen.getByAltText(
      `${mockProps.brandName} ${mockProps.modelName} ${selectedColor.color}`
    )

    expect(productImage).toHaveAttribute(
      'src',
      expect.stringMatching(new RegExp(`${selectedColor.color}-iphone\\.jpg`))
    )
  })

  it('updates image upon selecting another color option', async () => {
    render(<ProductCard {...mockProps} />)

    mockProps.availableColors.forEach(async (colorOption) => {
      const colorDot = screen.getByTestId(`color-dot-${colorOption.color}`)

      await userEvent.click(colorDot)

      await waitFor(() => {
        const phoneImageVariant = screen.getByAltText(
          `${mockProps.brandName} ${mockProps.modelName} ${colorOption.color}`
        )

        expect(phoneImageVariant).toHaveAttribute(
          'src',
          expect.stringMatching(new RegExp(`${colorOption.color}-iphone\\.jpg`))
        )
      })
    })
  })

  it('opens the PlaceOrderModal when the OrderNowBtn is clicked', async () => {
    render(<ProductCard {...mockProps} />)

    const orderNowBtn = screen.getByText('Order now')
    await userEvent.click(orderNowBtn)

    const placeOrderModal = screen.getByText('Finalise Your Order')
    expect(placeOrderModal).toBeInTheDocument()
  })
})
