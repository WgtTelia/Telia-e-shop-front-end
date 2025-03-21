import React from 'react';
import { mapColorToHex } from '@/lib/utils/colorUtils';

interface ColorDotsProps {
    availableColors: { color: string; index: number }[];
    onColorSelect: (index: number) => void;
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
                    className='size-3 cursor-pointer rounded-full outline outline-grey-200 hover:outline-2 hover:outline-primary'
                    style={{
                        backgroundColor: mapColorToHex(colorOption.color),
                    }}
                    onClick={() => onColorSelect(colorOption.index)}
                />
            ))}
        </div>
    );
};
