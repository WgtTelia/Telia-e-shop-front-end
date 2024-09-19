import { PlaceOrderModal } from '@/components/modals/PlaceOrderModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProps = {
  isOpen: true,
  setIsOpen: jest.fn(),
  brandName: 'Apple',
  modelName: 'iPhone 13',
  selectedColor: {
    color: 'black',
    stockAmount: 10,
    image: '/black-iphone.jpg',
  },
};

describe('PlaceOrderModal', () => {
  it('renders the header with the text "Finalise Your Order"', () => {
    render(<PlaceOrderModal {...mockProps} />);

    const header = screen.getByText('Finalise Your Order');
    expect(header).toBeInTheDocument();
  });

  it('renders the description with the text "Please leave your contact details below. We\'ll contact you very shortly to finalise your order."', () => {
    render(<PlaceOrderModal {...mockProps} />);

    const description = screen.getByText(
      "Please leave your contact details below. We'll contact you very shortly to finalise your order."
    );
    expect(description).toBeInTheDocument();
  });

  it('renders each of the input fields', () => {
    render(<PlaceOrderModal {...mockProps} />);

    const nameInput = screen.getByLabelText('* Name and surname');
    const emailInput = screen.getByLabelText('* Email');
    const phoneInput = screen.getByLabelText('* Phone number');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
  });

  it('can be closed when clicking X', async () => {
    render(<PlaceOrderModal {...mockProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockProps.setIsOpen).toHaveBeenCalledWith(false);
  });
});
