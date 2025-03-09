'use client';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useFilter } from '@/context/FilterContext';
import { CheckboxGroupSkeleton } from '@/components/filters/CheckboxGroupSkeleton';
import { CheckboxLargeScrn } from '@/components/filters/CheckboxLargeScrn';

export interface FilterCheckboxGroupProps<T extends FieldValues> {
    form?: UseFormReturn<T>;
    filterSections: {
        name: keyof Filter;
        title: string;
        options: FilterOptionType[];
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
                            options={section.options.map((option) =>
                                typeof option === 'string'
                                    ? { value: option, label: option }
                                    : option
                            )}
                        />
                    ) : (
                        <CheckboxLargeScrn
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
