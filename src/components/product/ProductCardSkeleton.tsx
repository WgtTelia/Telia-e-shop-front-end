import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className='flex flex-col gap-4 rounded-lg p-6 outline outline-1 outline-grey-100 sm:w-full'>
            <Skeleton className='h-card-img-height' />
            <div className='flex min-h-card-description flex-col gap-3'>
                <Skeleton className='h-4' />
                <Skeleton className='h-4' />
                <Skeleton className='h-4 w-40' />
            </div>
            <Skeleton className='ms-auto h-10 w-44 rounded-full' />
        </div>
    );
};
