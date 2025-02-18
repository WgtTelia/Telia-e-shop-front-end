import React from 'react';
import { render, screen } from '@testing-library/react';
import { SortProvider, useSort, initialState } from '@/context/SortContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('SortContext', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
        });
        (usePathname as jest.Mock).mockReturnValue('/products');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    it('provides the initial state', () => {
        const TestComponent = () => {
            const { sortOption, isSheetOpen, isDropDownOpen } = useSort();
            return (
                <>
                    <div data-testid='sort-option'>{sortOption}</div>
                    <div data-testid='is-sheet-open'>
                        {isSheetOpen.toString()}
                    </div>
                    <div data-testid='is-dropdown-open'>
                        {isDropDownOpen.toString()}
                    </div>
                </>
            );
        };

        render(
            <SortProvider>
                <TestComponent />
            </SortProvider>
        );

        expect(screen.getByTestId('sort-option')).toHaveTextContent(
            initialState.sortOption
        );
        expect(screen.getByTestId('is-sheet-open')).toHaveTextContent(
            initialState.isSheetOpen.toString()
        );
        expect(screen.getByTestId('is-dropdown-open')).toHaveTextContent(
            initialState.isDropDownOpen.toString()
        );
    });
});
