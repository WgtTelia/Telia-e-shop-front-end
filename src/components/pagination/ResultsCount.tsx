'use client';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';

export const ResultsCount = () => {
    const { data } = useProductsQuery();
    const totalResults = data?.content.length ?? 0;

    return (
        <div className='hidden text-gray-750 lg:block'>
            Found {totalResults} results
        </div>
    );
};
