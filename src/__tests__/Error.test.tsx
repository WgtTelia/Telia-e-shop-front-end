import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from '@/components/apiResponseState/Error';

describe('Error', () => {
    it('renders the error message correctly', () => {
        const errorMessage = 'An error occurred';

        render(<Error>{errorMessage}</Error>);

        // Check if the error message is rendered
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders the button with the correct text', () => {
        const errorMessage = 'An error occurred';

        render(<Error>{errorMessage}</Error>);

        // Check if the button is rendered with the correct text
        expect(
            screen.getByRole('button', { name: /try again/i })
        ).toBeInTheDocument();
    });
});
