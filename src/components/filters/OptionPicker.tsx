import React, { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface OptionPickerProps {
    options: SortOptionType[];
    selectedOption: string;
    onChange: (option: SortOptionType) => void;
}

export const OptionPicker: React.FC<OptionPickerProps> = ({
    options,
    selectedOption,
    onChange,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToOption = (index: number) => {
        const container = containerRef.current;
        if (container) {
            const scrollPosition = index * 24;
            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth',
            });
        }
    };

    //Callback here prevents it from being recreated every time the component renders, improving performance by preventing unnecessary re-renders of child components(button)
    const handleOptionClick = useCallback(
        (option: SortOptionType) => {
            onChange(option);
            const optionIndex = options.indexOf(option);
            scrollToOption(optionIndex);
        },
        [onChange, options]
    );

    return (
        <div
            className='relative max-h-20 w-full overflow-y-auto scroll-smooth'
            ref={containerRef}
            role='listbox'
        >
            <div className='flex flex-col items-center'>
                {options.map((option) => (
                    <Button
                        key={option.value}
                        variant='ghost'
                        role='option'
                        size='picker'
                        data-testid={`picker-option-${option.value}`}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full rounded-none border-none transition-colors duration-150 ease-in-out hover:text-white ${
                            selectedOption === option.value
                                ? 'bg-gray-600 text-white'
                                : 'text-gray-550'
                        }`}
                        aria-selected={selectedOption === option.value}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};
