import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useFilter } from '@/context/FilterContext';

interface CheckboxFormProps<T extends FieldValues> {
    form: { control: Control<T> };
    name: Path<T>;
    title: string;
    options: Array<string | { value: string; label: string }>;
}

export const CheckboxForm = <T extends FieldValues>({
    form,
    name,
    title,
    options,
}: CheckboxFormProps<T>) => {
    const { selectedFilters, toggleCheckbox } = useFilter();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: _field }) => (
                <FormItem>
                    <FormLabel className='text-base font-medium text-gray-750'>
                        {title}
                    </FormLabel>
                    <div className='space-y-4 pt-2 text-gray-750'>
                        {options.map((option, index) => {
                            const value =
                                typeof option === 'string'
                                    ? option
                                    : option.value;
                            const label =
                                typeof option === 'string'
                                    ? option
                                    : option.label;
                            const checkboxId = `${name}-${index}`;

                            const handleCheckboxChange = (checked: boolean) => {
                                toggleCheckbox(
                                    name as keyof Filter,
                                    value,
                                    checked
                                );
                            };

                            return (
                                <div
                                    key={value}
                                    className='flex flex-row items-center space-x-2 align-middle text-base'
                                >
                                    <FormControl>
                                        <Checkbox
                                            id={checkboxId}
                                            aria-label={label}
                                            data-testid={`checkbox-${value}`}
                                            checked={(
                                                selectedFilters[
                                                    name as keyof Filter
                                                ] as string[]
                                            ).includes(value)}
                                            onCheckedChange={
                                                handleCheckboxChange
                                            }
                                        />
                                    </FormControl>
                                    <FormLabel
                                        aria-label={label}
                                        className='font-light hover:cursor-pointer'
                                        htmlFor={checkboxId}
                                    >
                                        {label}
                                    </FormLabel>
                                </div>
                            );
                        })}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
