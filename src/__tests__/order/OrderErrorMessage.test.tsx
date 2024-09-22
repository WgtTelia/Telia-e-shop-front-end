import { OrderErrorMessage } from '@/components/forms/OrderErrorMessage';
import { render, screen } from '@testing-library/react';

describe('Order error message', () => {
  it('Displays the correct text', () => {
    render(<OrderErrorMessage />);
    expect(
      screen.getByText("Your order hasn't been placed")
    ).toBeInTheDocument();
  });

  it('Displays the correct icon', () => {
    render(<OrderErrorMessage />);
    expect(screen.getByTestId('triangle-icon')).toBeInTheDocument();
  });
});
