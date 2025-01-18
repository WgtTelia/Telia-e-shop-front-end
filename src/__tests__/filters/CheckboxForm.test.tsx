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

const CheckboxFormWrapper = ({ options }: { options: string[] }) => {
    const formMethods = useForm({
        defaultValues: {
            optionsField: [],
        },
    });

    return (
        <FormProvider {...formMethods}>
            <CheckboxForm
                form={{ control: formMethods.control }}
                name='optionsField'
                title='Select Options'
                options={options}
            />
        </FormProvider>
    );
};

describe('Checkbox Form', () => {
    it('should check and uncheck the checkbox, and update the form state correctly', () => {
        const testOptions = ['Option 1', 'Option 2'];

        const queryClient = new QueryClient();

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        });
        (usePathname as jest.Mock).mockReturnValue('/mock-pathname');
        (useSearchParams as jest.Mock).mockReturnValue({
            get: (key: string) => {
                if (key === 'mock-param') return 'mock-value';
                return null;
            },
            entries: jest.fn(),
            getAll: jest.fn(),
            has: jest.fn(),
            keys: jest.fn(),
            values: jest.fn(),
            forEach: jest.fn(),
            toString: jest.fn(),
            append: jest.fn(),
            delete: jest.fn(),
            set: jest.fn(),
        });

        render(
            <QueryClientProvider client={queryClient}>
                <FilterProvider>
                    <CheckboxFormWrapper options={testOptions} />
                </FilterProvider>
            </QueryClientProvider>
        );

        const option1Checkbox = screen.getByTestId(
            'checkbox-Option 1'
        ) as HTMLInputElement;
        const option2Checkbox = screen.getByTestId(
            'checkbox-Option 2'
        ) as HTMLInputElement;

        expect(option1Checkbox).not.toBeChecked();
        expect(option2Checkbox).not.toBeChecked();

        fireEvent.click(option1Checkbox);

        expect(option1Checkbox).toBeChecked();

        fireEvent.click(option2Checkbox);

        expect(option1Checkbox).toBeChecked();
        expect(option2Checkbox).toBeChecked();

        fireEvent.click(option1Checkbox);

        expect(option1Checkbox).not.toBeChecked();
        expect(option2Checkbox).toBeChecked();
    });
});
