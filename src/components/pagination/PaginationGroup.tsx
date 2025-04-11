'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/lib/hooks/usePagination';
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { defaultItemsPerPage } from './ResultsPerPageSelector';

export const PaginationGroup: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data } = useProductsQuery();

    const pageSizeParam = searchParams.get('pageSize');
    const itemsPerPage = pageSizeParam
        ? parseInt(pageSizeParam)
        : defaultItemsPerPage;
    const totalProducts = data?.content.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));

    const currentPage = useMemo(() => {
        const pageParam = searchParams.get('page');
        const pageNum = pageParam ? parseInt(pageParam, 10) : 1;
        return Math.max(1, Math.min(pageNum, totalPages));
    }, [searchParams, totalPages]);

    const { pageNumbers } = usePagination({
        totalPages,
        currentPage,
    });

    const handlePageChange = useCallback(
        (page: number) => {
            // Prevent navigation if page is invalid or already active
            if (page < 1 || page > totalPages || page === currentPage) {
                return;
            }
            const params = new URLSearchParams(searchParams);
            params.set('page', String(page));
            router.replace(`?${params.toString()}`, { scroll: false });
        },
        [totalPages, currentPage, searchParams, router]
    );

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination
            aria-label='Product pagination'
            className='mx-auto mt-auto flex w-full justify-center pt-6'
        >
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        className={
                            currentPage === 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer hover:bg-primary-active'
                        }
                    />
                </PaginationItem>

                {/* Page Numbers and Ellipsis */}
                {pageNumbers.map((page, index) => {
                    // Determine if an ellipsis is needed before this page number
                    const showEllipsisBefore =
                        index > 0 && pageNumbers[index - 1] !== page - 1;

                    return (
                        <React.Fragment key={page}>
                            {showEllipsisBefore && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    href={`?page=${page}`}
                                    isActive={currentPage === page}
                                    aria-current={
                                        currentPage === page
                                            ? 'page'
                                            : undefined
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(page);
                                    }}
                                    className={`hover:bg-primary-active ${currentPage !== page ? 'cursor-pointer' : ''}`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        </React.Fragment>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : 0}
                        className={
                            currentPage === totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer hover:bg-primary-active'
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
