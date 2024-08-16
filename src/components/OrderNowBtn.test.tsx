import { render, screen, fireEvent } from '@testing-library/react';
import { OrderNowBtn } from './OrderNowBtn';

describe('OrderNowBtn', () => {
  it('renders the button text', () => {
    render(<OrderNowBtn onClick={() => {}} />);

    const buttonText = screen.getByText(/Order now/i);

    expect(buttonText).toBeInTheDocument();
  });

  it('calls the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    render(<OrderNowBtn onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
