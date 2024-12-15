import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FilterCheckboxGroupProps<T extends FieldValues> {
    form?: UseFormReturn<T>;
    filterSections: {
        name: keyof Filter;
        title: string;
        options: string[];
    }[];
    handleFilterChange?: (category: keyof Filter, selected: string[]) => void;
}

export const FilterCheckboxGroup = <T extends FieldValues>({
    form,
    filterSections,
}: FilterCheckboxGroupProps<T>) => {
    return (
        <>
            {filterSections.map((section) =>
                form ? (
                    <CheckboxForm
                        key={section.name}
                        form={form}
                        name={section.name as Path<T>}
                        title={section.title}
                        options={section.options}
                    />
                ) : (
                    <CheckBoxLargeScrn
                        key={section.name}
                        name={section.name}
                        title={section.title}
                        options={section.options}
                    />
                )
            )}
        </>
    );
};
