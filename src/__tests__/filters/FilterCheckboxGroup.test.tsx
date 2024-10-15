import { fireEvent, render, screen } from '@testing-library/react';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { UseFormReturn } from 'react-hook-form';

jest.mock('@/components/filters/CheckBoxLargeScrn', () => ({
    CheckBoxLargeScrn: ({ title }: { title: string }) => (
        <div data-testid='checkbox-large-scrn'>{title}</div>
    ),
}));

jest.mock('@/components/filters/CheckboxForm', () => ({
    CheckboxForm: ({
        title,
        name,
        onChange,
    }: {
        title: string;
        name: string;
        onChange: () => void;
    }) => (
        <div data-testid='checkbox-form'>
            {title} - {name}
            <input
                type='checkbox'
                data-testid={`checkbox-input-${name}`}
                onChange={onChange}
            />
        </div>
    ),
}));

describe('FilterCheckboxGroup', () => {
    const mockFilterSections: {
        name: keyof Filter;
        title: string;
        options: string[];
    }[] = [
        { name: 'types', title: 'Product Types', options: ['Type1', 'Type2'] },
        { name: 'brands', title: 'Brands', options: ['Brand1', 'Brand2'] },
    ];

    it('renders CheckBoxLargeScrn when form is not provided', () => {
        render(
            <FilterCheckboxGroup
                filterSections={mockFilterSections}
                handleFilterChange={jest.fn()}
            />
        );

        mockFilterSections.forEach((section) => {
            expect(screen.getByText(section.title)).toBeInTheDocument();
        });

        const checkboxes = screen.getAllByTestId('checkbox-large-scrn');
        expect(checkboxes.length).toBe(mockFilterSections.length);
    });

    it('renders CheckboxForm when form is provided', () => {
        const mockForm = {
            getValues: jest
                .fn()
                .mockReturnValue({ types: ['Type1'], brands: ['Brand1'] }),
        } as unknown as UseFormReturn;

        render(
            <FilterCheckboxGroup
                form={mockForm}
                filterSections={mockFilterSections}
                handleFilterChange={jest.fn()}
            />
        );

        mockFilterSections.forEach((section) => {
            expect(
                screen.getByText(`${section.title} - ${section.name}`)
            ).toBeInTheDocument();
        });

        const forms = screen.getAllByTestId('checkbox-form');
        expect(forms.length).toBe(mockFilterSections.length);
    });

    it('triggers handleFilterChange when CheckboxForm onChange is fired', () => {
        const mockForm = {
            getValues: jest
                .fn()
                .mockReturnValue({ types: ['Type1'], brands: ['Brand1'] }),
        } as unknown as UseFormReturn;
        const mockHandleFilterChange = jest.fn();

        render(
            <FilterCheckboxGroup
                form={mockForm}
                filterSections={mockFilterSections}
                handleFilterChange={mockHandleFilterChange}
            />
        );

        const firstCheckboxInput = screen.getByTestId('checkbox-input-types');
        fireEvent.click(firstCheckboxInput);

        expect(mockHandleFilterChange).toHaveBeenCalledWith('types', ['Type1']);
    });
});
