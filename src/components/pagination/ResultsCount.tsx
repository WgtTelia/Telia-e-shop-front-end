'use client';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';

export const ResultsCount = () => {
    const { data } = useProductsQuery();
    const totalResults = data?.content.length ?? 0;

    return (
        <div className='ps-2 text-gray-750'>Found {totalResults} results</div>
    );
};
