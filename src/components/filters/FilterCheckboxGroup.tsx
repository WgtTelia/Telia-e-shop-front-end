import { FilterState } from '@/context/FilterContext';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FilterCheckboxGroupProps<T extends FieldValues> {
    form?: UseFormReturn<T>;
    filterSections: {
        name: keyof FilterState;
        title: string;
        options: string[];
    }[];
    handleFilterChange?: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
    onImmediateChange?: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
}

export const FilterCheckboxGroup = <T extends FieldValues>({
    form,
    filterSections,
    handleFilterChange,
    onImmediateChange,
}: FilterCheckboxGroupProps<T>) => {
    const handleCheckboxChange = (
        name: keyof FilterState,
        selected: string[]
    ) => {
        handleFilterChange?.(name, selected);
        onImmediateChange?.(name, selected);
    };

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
                        onChange={() =>
                            handleCheckboxChange(
                                section.name,
                                form.getValues()[section.name]
                            )
                        }
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
