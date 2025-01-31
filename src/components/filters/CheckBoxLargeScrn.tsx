import { Checkbox } from '@/components/ui/checkbox';
import { useFilter } from '@/context/FilterContext';

export interface CheckBoxLargeScrnProps {
    name: keyof Filter;
    title: string;
    options: Array<string | { value: string; label: string }>;
}

export const CheckBoxLargeScrn: React.FC<CheckBoxLargeScrnProps> = ({
    name,
    title,
    options,
}) => {
    const { selectedFilters, toggleCheckbox } = useFilter();

    return (
        <div className='space-y-4'>
            <h3 className='mb-3 font-medium text-gray-750'>{title}</h3>
            {options.map((option, index) => {
                const value =
                    typeof option === 'string' ? option : option.value;
                const label =
                    typeof option === 'string' ? option : option.label;
                const checkboxId = `${name}-${index}`;

                const handleCheckboxChange = (checked: boolean) => {
                    toggleCheckbox(name, value, checked);
                };

                return (
                    <div
                        key={value}
                        className='flex flex-row items-center space-x-2 align-middle text-base'
                    >
                        <Checkbox
                            id={checkboxId}
                            aria-label={label}
                            checked={(
                                selectedFilters[name] as string[]
                            ).includes(value)}
                            onCheckedChange={handleCheckboxChange}
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
