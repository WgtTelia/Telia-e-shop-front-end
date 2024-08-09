'use client';

import React, { useState } from 'react';
import { ButtonCTA } from '@/components/ButtonCTA';
import { ColorDots } from '@/components/ColorDots';
import { StockStatus } from '@/components/StockStatus';

export const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  brandName,
  modelName,
  productImage,
  availableColors,
  shortDescription,
  pricePerMonth,
  productType,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    availableColors[0]
  );

  return (
    <div className='rounded-lg bg-grey-100 outline outline-1 outline-grey-200'>
      <div className='flex w-[320px] flex-col gap-4 p-6'>
        <figure className='grid h-[116px] grid-cols-2 items-center justify-center'>
          <div className='mx-auto max-w-[100px]'>
            <img
              src={selectedColor ? selectedColor.image : productImage}
              alt={`${brandName} ${modelName} ${
                selectedColor ? selectedColor.color : availableColors[0]
              }`}
              className='w-full'
            />
          </div>
          <figcaption className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-sm uppercase text-grey-800'>{brandName}</h3>
              <h2 className='text-xl font-bold text-grey-900'>{modelName}</h2>
            </div>
            <ColorDots
              availableColors={availableColors}
              onColorSelect={setSelectedColor}
            />
          </figcaption>
        </figure>
        <p>{shortDescription}</p>
        <div className='flex items-center justify-between'>
          <p className='font-base font-bold text-grey-900'>
            {pricePerMonth}€/month
          </p>
          <ButtonCTA onClick={() => alert('Added to cart')} />
        </div>
      </div>
      <hr />
      <StockStatus stockAmount={selectedColor.stockAmount} />
    </div>
  );
};
