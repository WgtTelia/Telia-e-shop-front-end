'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSort } from '@/context/SortContext';
import { SORT_OPTIONS } from '@/data/sortOption';

export const SortRadioGroup = () => {
    const { sortOption, setSortOption } = useSort();

    return (
        <>
            <h3 className='mb-3 font-medium text-gray-750'>Sort by</h3>
            <RadioGroup
                value={sortOption}
                onValueChange={(value) => {
                    setSortOption(value as SortOption);
                    // eslint-disable-next-line no-console
                    console.log('Selected sort option:', value); // Temp. to see selected option
                }}
            >
                {SORT_OPTIONS.map((option) => (
                    <div
                        key={option}
                        className='flex items-center space-x-2 text-base font-light'
                    >
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </RadioGroup>
        </>
    );
};
