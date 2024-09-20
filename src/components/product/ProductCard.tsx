'use client';

import React, { useState } from 'react';
import { ColorDots } from '@/components/product/ColorDots';
import { StockStatus } from '@/components/product/StockStatus';
import { PlaceOrderModal } from '@/components/modals/PlaceOrderModal';
import Image from 'next/image';

export const ProductCard: React.FC<ProductCardProps> = ({
  brandName,
  modelName,
  productImage,
  availableColors,
  shortDescription,
  pricePerMonth,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    availableColors[0]
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='aspect-card w-card-width rounded-lg bg-grey-100 outline outline-1 outline-grey-200'>
      <div className='flex flex-col gap-4 p-6'>
        <figure className='h-card-img-height grid grid-cols-2 items-center justify-center'>
          <div className='h-card-img-height w-card-img-width relative mx-auto'>
            <Image
              fill
              sizes='100px'
              src={
                selectedColor && typeof selectedColor.image === 'string'
                  ? selectedColor.image
                  : productImage
              }
              alt={`${brandName} ${modelName} ${
                selectedColor ? selectedColor.color : availableColors[0]
              }`}
              className='object-contain'
            />
          </div>
          <figcaption className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-sm uppercase text-grey-800'>{brandName}</h2>
              <h3 className='text-xl font-bold text-grey-900'>{modelName}</h3>
            </div>
            <ColorDots
              availableColors={availableColors}
              onColorSelect={setSelectedColor}
            />
          </figcaption>
        </figure>
        <p className='min-h-card-description'>{shortDescription}</p>
        <div className='flex items-center justify-between'>
          <p className='font-base font-bold text-grey-900'>
            {pricePerMonth}€/month
          </p>
          <PlaceOrderModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            brandName={brandName}
            modelName={modelName}
            selectedColor={selectedColor}
          />
        </div>
      </div>
      <hr />
      <StockStatus stockAmount={selectedColor.stockAmount} />
    </div>
  );
};
