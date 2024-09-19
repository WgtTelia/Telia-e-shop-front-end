import { PlaceOrderForm } from '@/components/forms/PlaceOrderForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProps = {
  onClose: jest.fn(),
  brandName: 'Apple',
  modelName: 'iPhone 13',
  selectedColor: {
    color: 'black',
    stockAmount: 10,
    image: '/black-iphone.jpg',
  },
};

describe('PlaceOrderForm', () => {
  it('renders error messages when input is incorrect', async () => {
    render(<PlaceOrderForm {...mockProps} />);

    const submitButton = screen.getByText('Place order');
    await userEvent.click(submitButton);

    const nameError = await screen.findByText(
      'Name and surname must contain at least 2 characters followed by a space and at least another 2 characters'
    );
    const emailError = await screen.findByText('Invalid email address');
    const phoneError = await screen.findByText('Invalid phone number');

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
  });

  it('shows the success message on successful submission', async () => {
    render(<PlaceOrderForm {...mockProps} />);

    const nameInput = screen.getByLabelText('* Name and surname');
    const emailInput = screen.getByLabelText('* Email');
    const phoneInput = screen.getByLabelText('* Phone number');
    const submitButton = screen.getByText('Place order');

    await userEvent.type(nameInput, 'John Smith');
    await userEvent.type(emailInput, 'john.smith@gmail.com');
    await userEvent.type(phoneInput, '+37064588162');
    await userEvent.click(submitButton);

    const successMessage = await screen.findByText("We've received your order");
    expect(successMessage).toBeInTheDocument();
  });
});
