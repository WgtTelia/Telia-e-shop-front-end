'use client';

import React, { useState } from 'react';
import { ButtonCTA } from '@/components/ButtonCTA';
import { ColorDots } from '@/components/ColorDots';

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
              alt={`${brandName} ${modelName}`}
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
          <ButtonCTA />
        </div>
      </div>
      <hr />
      <div className='flex items-center justify-center gap-2 py-2'>
        <div
          className={`h-[8px] w-[8px] rounded-full outline outline-2 ${
            selectedColor.stockAmount === 0
              ? 'bg-danger outline-danger-light'
              : selectedColor.stockAmount <= 10
                ? 'bg-warning outline-warning-light'
                : 'bg-success outline-success-light'
          }`}
        ></div>
        <p
          className={
            selectedColor.stockAmount === 0
              ? 'text-danger'
              : selectedColor.stockAmount <= 10
                ? 'text-warning'
                : 'text-success'
          }
        >
          {selectedColor.stockAmount === 0
            ? 'Not in stock'
            : selectedColor.stockAmount <= 10
              ? 'Low stock'
              : 'In stock'}
        </p>
      </div>
    </div>
  );
};
