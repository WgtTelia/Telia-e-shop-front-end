'use client';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useFilter } from '@/context/FilterContext';
import { CheckboxGroupSkeleton } from './CheckboxGroupSkeleton';

export interface FilterCheckboxGroupProps<T extends FieldValues> {
    form?: UseFormReturn<T>;
    filterSections: {
        name: keyof Filter;
        title: string;
        options: Array<string | { value: string; label: string }>;
    }[];
}
export const FilterCheckboxGroup = <T extends FieldValues>({
    form,
    filterSections,
}: FilterCheckboxGroupProps<T>) => {
    const { isLoading } = useFilter();
    return (
        <>
            {isLoading ? (
                <CheckboxGroupSkeleton rows={2} cols={3} />
            ) : (
                filterSections.map((section) =>
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
                )
            )}
        </>
    );
};
