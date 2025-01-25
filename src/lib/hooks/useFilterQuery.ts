import { useQuery } from '@tanstack/react-query';
import classifiersService from '@/lib/services/classifiersService';
import { CanceledError } from 'axios';

export const useFilterQuery = () => {
    return useQuery({
        queryKey: ['classifiers'],
        queryFn: async ({ signal }) => {
            const { request, cancel } =
                classifiersService.getAll<FilterOptions>(false);
            signal.addEventListener('abort', () => {
                cancel();
            });
            try {
                return (await request).data;
            } catch (error) {
                if (error instanceof CanceledError) {
                    console.error('Query canceled');
                } else {
                    throw error;
                }
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        //  to prevent unnecessary refetches
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};
