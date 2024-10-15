import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxForm } from '@/components/filters/CheckboxForm';

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
                onChange={jest.fn()}
            />
        </FormProvider>
    );
};

describe('Checkbox Form', () => {
    it('should check and uncheck the checkbox, and update the form state correctly', () => {
        const testOptions = ['Option 1', 'Option 2'];

        render(<CheckboxFormWrapper options={testOptions} />);

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
