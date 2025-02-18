import { render, screen } from '@testing-library/react';
import { UseFormReturn } from 'react-hook-form';
import { useFilter } from '@/context/FilterContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('@/components/filters/CheckBoxLargeScrn', () => {
    return {
        CheckBoxLargeScrn: function MockCheckBoxLargeScrn({
            title,
        }: {
            title: string;
        }) {
            return <div data-testid='checkbox-large-scrn'>{title}</div>;
        },
    };
});

jest.mock('@/components/filters/CheckboxForm', () => ({
    CheckboxForm: ({
        title,
        name,
        options,
    }: {
        title: string;
        name: string;
        options: string[];
    }) => (
        <div data-testid='checkbox-form'>
            {title} - {name}
            {options.map((option, index) => (
                <input
                    key={index}
                    type='checkbox'
                    data-testid={`checkbox-input-${name}-${option}`}
                />
            ))}
        </div>
    ),
}));

jest.mock('@/context/FilterContext', () => ({
    ...jest.requireActual('@/context/FilterContext'),
    useFilter: jest.fn(),
}));

describe('Filter CheckboxGroup', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
        });
        (usePathname as jest.Mock).mockReturnValue('/products');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    const mockFilterSections: {
        name: keyof Filter;
        title: string;
        options: string[];
    }[] = [
        {
            name: 'types' as keyof Filter,
            title: 'Product Types',
            options: ['Type1', 'Type2'],
        },
        { name: 'brands', title: 'Brands', options: ['Brand1', 'Brand2'] },
    ];

    it('renders CheckBoxLargeScrn when form is not provided', () => {
        (useFilter as jest.Mock).mockReturnValue({
            isLoading: false,
        });

        render(<FilterCheckboxGroup filterSections={mockFilterSections} />);

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

        (useFilter as jest.Mock).mockReturnValue({
            selectedFilters: { types: ['Type1'], brands: ['Brand1'] },
            toggleCheckbox: jest.fn(),
        });

        render(
            <FilterCheckboxGroup
                form={mockForm}
                filterSections={mockFilterSections}
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
            getValues: jest.fn().mockReturnValue({ types: [], brands: [] }),
        } as unknown as UseFormReturn;

        const mockHandleFilterChange = jest.fn();
        const mockToggleCheckbox = jest.fn();

        (useFilter as jest.Mock).mockReturnValue({
            selectedFilters: { types: [], brands: [] },
            toggleCheckbox: mockToggleCheckbox,
        });

        render(
            <FilterCheckboxGroup
                form={mockForm}
                filterSections={mockFilterSections}
            />
        );

        mockToggleCheckbox.mockImplementation((category, value, checked) => {
            if (category === 'types' && value === 'Type1' && checked) {
                mockHandleFilterChange('types', ['Type1']);
            }
        });

        mockToggleCheckbox('types', 'Type1', true);

        expect(mockHandleFilterChange).toHaveBeenCalledWith('types', ['Type1']);
    });
});
