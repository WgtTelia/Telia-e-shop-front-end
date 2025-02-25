import { Checkbox } from '@/components/ui/checkbox';
import { useFilter } from '@/context/FilterContext';

export interface CheckboxLargeScrnProps {
    name: keyof Filter;
    title: string;
    options: Array<{ value: string; label: string }>;
}

export const CheckboxLargeScrn: React.FC<CheckboxLargeScrnProps> = ({
    name,
    title,
    options,
}) => {
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
        <div className='space-y-4'>
            <h3 className='mb-3 font-medium text-gray-750'>{title}</h3>
            {options.map((option, index) => {
                const { value, label, checkboxId } = getCheckboxOptionDetails(
                    option,
                    index
                );

                return (
                    <div
                        key={value}
                        className='flex flex-row items-center space-x-2 align-middle text-base'
                    >
                        <Checkbox
                            id={checkboxId}
                            aria-label={label}
                            checked={isCheckboxChecked(value)}
                            onCheckedChange={handleCheckboxChange(value)}
                        />
                        <label
                            aria-label={label}
                            htmlFor={checkboxId}
                            className='font-light hover:cursor-pointer'
                        >
                            {label}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
