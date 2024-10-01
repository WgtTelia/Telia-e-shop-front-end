import React from 'react';
import { render, screen } from '@testing-library/react';
import { StockStatus } from '@/components/product/StockStatus';

describe('StockStatus component', () => {
    it('returns <Not in stock> for stockAmount === 0', () => {
        render(<StockStatus stockAmount={0} />);
        expect(screen.getByText('Not in stock')).toBeInTheDocument();
    });

    it('returns <Low stock> for stockAmount <= 10', () => {
        render(<StockStatus stockAmount={9} />);
        expect(screen.getByText('Low stock')).toBeInTheDocument();
    });

    it('returns <In stock> for stockAmount > 10', () => {
        render(<StockStatus stockAmount={11} />);
        expect(screen.getByText('In stock')).toBeInTheDocument();
    });
});
