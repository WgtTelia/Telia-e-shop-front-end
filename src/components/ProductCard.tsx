import React from 'react';
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
  return (
    <div className='flex w-[320px] flex-col gap-4 rounded-lg bg-grey-100 p-6 outline outline-1 outline-grey-200'>
      <figure className='grid h-[116px] grid-cols-2 items-center justify-center'>
        <div className='mx-auto max-w-[100px]'>
          <img
            src={productImage}
            alt={`${brandName} ${modelName}`}
            className='w-full'
          />
        </div>
        <figcaption className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-sm uppercase text-grey-800'>{brandName}</h3>
            <h2 className='text-xl font-bold text-grey-900'>{modelName}</h2>
          </div>
          <ColorDots availableColors={availableColors} />
        </figcaption>
      </figure>
      <p>{shortDescription}</p>
      <div className='flex items-center justify-between'>
        <p className='font-base font-bold text-grey-900'>
          {pricePerMonth}€/month
        </p>
        <ButtonCTA />
      </div>
      <hr />
      <div className='border-t-1 flex items-center justify-center gap-2 border-grey-900'>
        <div className='h-[8px] w-[8px] rounded-full bg-success outline outline-2 outline-success-light'></div>
        <p className='text-success'>In stock</p>
      </div>
    </div>
  );
};
