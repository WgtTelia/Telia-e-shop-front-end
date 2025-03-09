import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { FilterProvider } from '@/context/FilterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

const CheckboxFormWrapper = ({ options }: { options: FilterOptionType[] }) => {
    const formMethods = useForm({
        defaultValues: {
            stockOptions: [],
        },
    });

    return (
        <FormProvider {...formMethods}>
            <CheckboxForm
                form={{ control: formMethods.control }}
                name='stockOptions'
                title='Select Options'
                options={options}
            />
        </FormProvider>
    );
};

describe('Checkbox Form', () => {
    const mockSearchParams = new URLSearchParams();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
        });
        (usePathname as jest.Mock).mockReturnValue('/products');
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    });

    it('should check and uncheck the checkbox, and update the form state correctly', () => {
        const testOptions: FilterOptionType[] = [
            { value: 'IN_STOCK', label: 'In Stock' },
            { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
        ];

        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <FilterProvider>
                    <CheckboxFormWrapper options={testOptions} />
                </FilterProvider>
            </QueryClientProvider>
        );

        const inStockCheckbox = screen.getByTestId(
            'checkbox-IN_STOCK'
        ) as HTMLInputElement;
        const outOfStockCheckbox = screen.getByTestId(
            'checkbox-OUT_OF_STOCK'
        ) as HTMLInputElement;

        expect(inStockCheckbox).not.toBeChecked();
        expect(outOfStockCheckbox).not.toBeChecked();

        fireEvent.click(inStockCheckbox);
        expect(inStockCheckbox).toBeChecked();

        fireEvent.click(outOfStockCheckbox);
        expect(outOfStockCheckbox).toBeChecked();

        fireEvent.click(inStockCheckbox);
        expect(inStockCheckbox).not.toBeChecked();
        expect(outOfStockCheckbox).toBeChecked();
    });
});
