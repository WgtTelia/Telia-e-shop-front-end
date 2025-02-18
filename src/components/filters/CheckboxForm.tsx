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
    options: Array<{ value: string; label: string }>;
}

export const CheckboxForm = <T extends FieldValues>({
    form,
    name,
    title,
    options,
}: CheckboxFormProps<T>) => {
    const { selectedFilters, toggleCheckbox } = useFilter();

    const getCheckboxOptionDetails = (
        option: { value: string; label: string },
        index: number
    ) => {
        const value = option.value;
        const label = option.label;
        const checkboxId = `${name}-${index}`;
        return { value, label, checkboxId };
    };

    const handleCheckboxChange =
        (optionValue: string) => (checked: boolean) => {
            toggleCheckbox(name as keyof Filter, optionValue, checked);
        };

    const isCheckboxChecked = (optionValue: string) => {
        return (
            (selectedFilters[name as keyof Filter] as string[]) || []
        ).includes(optionValue);
    };

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
                            const { value, label, checkboxId } =
                                getCheckboxOptionDetails(option, index);
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
                                            checked={isCheckboxChecked(value)}
                                            onCheckedChange={handleCheckboxChange(
                                                value
                                            )}
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
