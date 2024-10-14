import { Checkbox } from '@/components/ui/checkbox';
import { useFilter } from '@/context/FilterContext';

interface CheckBoxLargeScrnProps {
    name: keyof Filter;
    title: string;
    options: string[];
}

//For the fetched data only, the behavior like this
export const CheckBoxLargeScrn: React.FC<CheckBoxLargeScrnProps> = ({
    name,
    title,
    options,
}) => {
    const { selectedFilters, toggleCheckbox } = useFilter();

    const handleCheckboxChange = (value: string, checked: boolean) => {
        toggleCheckbox(name, value, checked);
    };

    return (
        <div className='space-y-4'>
            <h3 className='mb-3 font-medium text-gray-750'>{title}</h3>
            {options.map((option) => {
                const checkboxId = `${name}-${option}`;
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
                            onCheckedChange={(checked) =>
                                handleCheckboxChange(option, checked === true)
                            }
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
