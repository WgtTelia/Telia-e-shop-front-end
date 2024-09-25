import { OrderSuccessMessage } from '@/components/forms/OrderSuccessMessage';
import { render, screen } from '@testing-library/react';

describe('Order success message', () => {
    it('Displays the correct text', () => {
        render(<OrderSuccessMessage />);
        expect(
            screen.getByText("We've received your order")
        ).toBeInTheDocument();
    });

    it('Displays the correct icon', () => {
        render(<OrderSuccessMessage />);
        expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
});
