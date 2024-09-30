'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterState, useFilter } from '@/context/FilterContext';

interface CheckBoxLargeScrnProps {
    name: keyof FilterState;
    title: string;
    options: string[];
}

export const CheckBoxLargeScrn: React.FC<CheckBoxLargeScrnProps> = ({
    name,
    title,
    options,
}) => {
    const { selectedFilters, handleImmediateChange } = useFilter();

    const selectedValues = selectedFilters[name] as string[];

    const handleCheckboxChange = (value: string, checked: boolean) => {
        const updatedValues = checked
            ? [...selectedValues, value] // Add value if checked
            : selectedValues.filter((v) => v !== value); // Remove value if unchecked

        handleImmediateChange(name, updatedValues);
    };

    return (
        <div>
            <h3 className='font-semibold'>{title}</h3>
            {options.map((option) => (
                <div
                    key={option}
                    className='flex flex-row items-start space-x-3 space-y-0'
                >
                    <Checkbox
                        checked={selectedValues.includes(option)}
                        onCheckedChange={(checked: boolean) => {
                            handleCheckboxChange(option, checked);
                        }}
                    />
                    <label htmlFor={option} className='font-normal'>
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};
