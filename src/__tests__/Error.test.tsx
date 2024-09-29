import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Error } from '@/components/apiResponseState/Error';

describe('Error', () => {
    it('renders the error message correctly', () => {
        const errorMessage = 'An error occurred';

        render(<Error>{errorMessage}</Error>);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders the button with the correct text', () => {
        const errorMessage = 'An error occurred';

        render(<Error>{errorMessage}</Error>);

        expect(
            screen.getByRole('button', { name: /try again/i })
        ).toBeInTheDocument();
    });
});
