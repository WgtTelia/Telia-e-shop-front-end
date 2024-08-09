import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonCTA } from '@/components/ButtonCTA';

describe('ButtonCTA', () => {
  it('renders the button text', () => {
    render(<ButtonCTA onClick={() => {}} />);

    const buttonText = screen.getByText(/Order now/i);

    expect(buttonText).toBeInTheDocument();
  });

  it('calls the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    render(<ButtonCTA onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
