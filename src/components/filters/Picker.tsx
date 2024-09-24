import React, { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PickerProps {
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
}

export const Picker: React.FC<PickerProps> = ({
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
        (option: string) => {
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
                        key={option}
                        variant='ghost'
                        role='option'
                        size='picker'
                        test-id='picker-option-Price'
                        onClick={() => handleOptionClick(option)}
                        className={`w-full rounded-none border-none transition-colors duration-150 ease-in-out hover:text-white ${
                            selectedOption === option
                                ? 'bg-gray-600 text-white'
                                : 'text-gray-550'
                        }`}
                        aria-selected={selectedOption === option}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
};
