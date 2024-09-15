import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface WheelPickerProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ options, selectedOption, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    onChange(option);
    const optionIndex = options.indexOf(option);
    const container = containerRef.current;
    if (container) {
      const scrollPosition = optionIndex * 40; 
      container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-y-auto scroll-smooth w-full" ref={containerRef}>
      <div className="flex flex-col items-center space-y-1 py-1">
        {options.map((option) => (
          <Button
            key={option}
            variant={selectedOption === option ? 'default' : 'ghost'}
            onClick={() => handleOptionClick(option)}
            className="w-full text-center"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WheelPicker;
