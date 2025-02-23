import { useQuery } from '@tanstack/react-query';
import productService from '@/lib/services/productService';
import { CanceledError } from 'axios';
import { useSearchParams } from 'next/navigation';

export const useProductsQuery = () => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: ['products', searchParams.toString()],
        queryFn: async ({ signal }) => {
            const { request, cancel } = productService.getAll<APIProductData>(
                false,
                new URLSearchParams(searchParams.toString())
            );
            const response = await request;
            signal.addEventListener('abort', () => {
                cancel();
            });
            try {
                return (response.data as APIProductData).content;
            } catch (error) {
                if (error instanceof CanceledError) {
                    console.error('Query canceled');
                } else {
                    throw error;
                }
            }
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};
