import { Checkbox } from '@/components/ui/checkbox';
import { useFilter } from '@/context/FilterContext';

export interface CheckBoxLargeScrnProps {
    name: keyof Filter;
    title: string;
    options: string[];
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
            {options.map((option) => {
                const checkboxId = `${name}-${option}`;
                const handleCheckboxChange = (checked: boolean) => {
                    toggleCheckbox(
                        name as keyof Filter,
                        option,
                        checked as boolean
                    );
                };
                return (
                    <div
                        key={option}
                        className='flex flex-row items-center space-x-2 align-middle text-base'
                    >
                        <Checkbox
                            id={checkboxId}
                            aria-label={option}
                            checked={(
                                (selectedFilters[name] as string[]) || []
                            ).includes(option)}
                            onCheckedChange={handleCheckboxChange}
                        />
                        <label
                            aria-label={option}
                            htmlFor={checkboxId}
                            className='font-light hover:cursor-pointer'
                        >
                            {option}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
