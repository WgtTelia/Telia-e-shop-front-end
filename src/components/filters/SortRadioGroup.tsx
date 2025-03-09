'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';

export const SortRadioGroup = () => {
    const { sortOption, setSortOption } = useSort();

    return (
        <>
            <h3 className='font-medium text-gray-750'>Sort by</h3>
            <RadioGroup
                value={sortOption}
                onValueChange={(value: SortOptionValueType) => {
                    setSortOption(value);
                }}
            >
                {SORT_OPTIONS.map((option: SortOptionType) => (
                    <div
                        key={option.value}
                        className='cursor:pointer flex items-center space-x-2 text-base font-light'
                    >
                        <RadioGroupItem
                            value={option.value}
                            id={option.label}
                            aria-label={option.label}
                        />
                        <label
                            htmlFor={option.label}
                            className='hover:cursor-pointer'
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </>
    );
};
