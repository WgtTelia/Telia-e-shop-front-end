import React from 'react';
import { TestButton } from 'src/components/TestButton';

export const ProductCard: React.FC<ProductCardProps> = ({
  brandName,
  modelName,
  availableColors,
  shortDescription,
  pricePerMonth,
}) => {
  return (
    <div className='flex w-[320px] flex-col gap-4 rounded-lg bg-grey-100 p-6 outline outline-1 outline-grey-200'>
      <figure className='grid grid-cols-2 items-center justify-center'>
        <div className='max-w-[100px]'>
          <img src='/phone.png' alt='phone image' className='w-full' />
        </div>
        <figcaption className='flex flex-col'>
          <div className='flex flex-col justify-between'>
            <h3 className='text-sm uppercase text-grey-800'>{brandName}</h3>
            <h2 className='text-xl font-bold text-grey-900'>{modelName}</h2>
          </div>
          <div>(colors)</div>
        </figcaption>
      </figure>
      <p>{shortDescription}</p>
      <div className='flex items-center justify-between'>
        <p className='font-base font-bold text-grey-900'>
          {pricePerMonth}€/month
        </p>
        <TestButton />
      </div>
      <hr/>
      <div className='border-t-1 flex items-center justify-center gap-2 border-grey-900'>
        <div className='h-[8px] w-[8px] rounded-full bg-success outline outline-2 outline-success-light'></div>
        <p className='text-success'>In stock</p>
      </div>
    </div>
    
  );
};
