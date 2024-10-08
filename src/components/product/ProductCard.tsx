'use client';
import React, { useState } from 'react';
import { ColorDots } from '@/components/product/ColorDots';
import { StockStatus } from '@/components/product/StockStatus';
import { PlaceOrderModal } from '@/components/modals/PlaceOrderModal';
import Image from 'next/image';

export const ProductCard: React.FC<ProductCardProps> = ({
    brand,
    id,
    name,
    productVariants,
    shortDescription,
}) => {
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
    const [imageError, setImageError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div
            data-testid={`product-card-${id}`}
            className='rounded-lg bg-grey-100 outline outline-1 outline-grey-200 sm:w-full'
        >
            <div className='flex flex-col gap-4 p-6'>
                <figure className='grid h-card-img-height grid-cols-2 items-center justify-center'>
                    <div className='relative mx-auto h-card-img-height w-card-img-width'>
                        <Image
                            fill
                            sizes='100px'
                            src={
                                imageError
                                    ? '/no_image.png'
                                    : productVariants[selectedVariantIndex]
                                          .imgUrl
                            }
                            alt={`${brand} ${name} ${productVariants[selectedVariantIndex].color}`}
                            onError={handleImageError}
                            className={`object-contain ${
                                imageError ? 'opacity-20' : ''
                            }`}
                        />
                    </div>
                    <figcaption className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-sm uppercase text-grey-800'>
                                {brand}
                            </h2>
                            <h3 className='text-xl font-bold text-grey-900'>
                                {name}
                            </h3>
                        </div>
                        <ColorDots
                            availableColors={productVariants.map(
                                (variant, index) => ({ ...variant, index })
                            )}
                            onColorSelect={(index) =>
                                setSelectedVariantIndex(index)
                            }
                        />
                    </figcaption>
                </figure>
                <p className='min-h-card-description'>{shortDescription}</p>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-grey-900'>
                        {productVariants[selectedVariantIndex].monthlyPrice}{' '}
                        €/month
                    </p>
                    <PlaceOrderModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        brandName={brand}
                        modelName={name}
                        selectedColor={
                            productVariants[selectedVariantIndex].color
                        }
                        stockAmount={
                            productVariants[selectedVariantIndex].stock[0]
                                .qtyInStock
                        }
                    />
                </div>
            </div>
            <hr />
            <StockStatus
                stockAmount={
                    productVariants[selectedVariantIndex].stock[0].qtyInStock
                }
            />
        </div>
    );
};
