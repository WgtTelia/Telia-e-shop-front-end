import React, { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PickerProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
}

export const Picker: React.FC<PickerProps> = ({ options, selectedOption, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  

  const scrollToOption = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const scrollPosition = index * 28; 
      container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
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
    <div className="relative overflow-y-auto scroll-smooth w-full max-h-76" ref={containerRef} role="listbox" >
      <div className="flex flex-col items-center " >
        {options.map((option) => (
          <Button
            key={option}
            variant='ghost'
            role="option"
            onClick={() => handleOptionClick(option)}
            className={`transition-colors ease-in-out duration-150 border-none w-full rounded-none  hover:bg-gray-600 hover:text-white ${
              selectedOption === option ? 'text-white' : 'text-gray-550'
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


