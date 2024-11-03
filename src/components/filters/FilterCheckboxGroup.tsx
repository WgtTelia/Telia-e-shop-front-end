'use client';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useFilter } from '@/context/FilterContext';
import { Skeleton } from '@/components/ui/skeleton';

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
    const { isLoading } = useFilter();
    return (
        <>
            {isLoading ? (
                <div className='space-y-4'>
                    {filterSections.map((section) => (
                        <div key={section.name} className='p-4'>
                            <Skeleton className='h-10 w-32' />
                            <div className='mt-2 space-y-2'>
                                {Array.from({ length: 3 }).map(
                                    (
                                        _,
                                        index // adjust the number (3) to match the number of checkboxes you expect
                                    ) => (
                                        <Skeleton
                                            key={index}
                                            className='h-4 w-20'
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Render the actual checkboxes when isLoading is false
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
