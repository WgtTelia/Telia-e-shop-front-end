import React from 'react';
import { ButtonCTA } from '@/components/ButtonCTA';

const colorMapping: { [key: string]: string } = {
  black: '#000000',
  pink: '#FFC0CB',
  yellow: '#FFFF00',
  blue: '#0000FF',
  green: '#008000',
  lavender: '#E6E6FA',
  white: '#FFFFFF',
  grey: '#808080',
};

function mapColorToHex(color: string): string {
  return colorMapping[color.toLowerCase()] || '#000000';
}

function generateColorDots(availableColors: ColorOption[]): JSX.Element[] {
  return availableColors.map((colorOption) => (
    <div
      key={colorOption.color}
      title={colorOption.color}
      className='h-[12px] w-[12px] cursor-pointer rounded-full outline outline-grey-200'
      style={{ backgroundColor: mapColorToHex(colorOption.color) }}
    />
  ));
}

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
          <div className='flex gap-2'>{generateColorDots(availableColors)}</div>
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
