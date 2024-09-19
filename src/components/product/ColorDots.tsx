import React from 'react';
import { mapColorToHex } from '@/lib/colorUtils';

interface ColorDotsProps {
  availableColors: ColorOption[];
  onColorSelect: (color: ColorOption) => void;
}

export const ColorDots: React.FC<ColorDotsProps> = ({
  availableColors,
  onColorSelect,
}) => {
  return (
    <div className='flex gap-2'>
      {availableColors.map((colorOption) => (
        <div
          key={colorOption.color}
          title={colorOption.color}
          className='size-[12px] cursor-pointer rounded-full outline outline-grey-200 hover:outline-2 hover:outline-primary'
          style={{ backgroundColor: mapColorToHex(colorOption.color) }}
          onClick={() => onColorSelect(colorOption)}
        />
      ))}
    </div>
  );
};
