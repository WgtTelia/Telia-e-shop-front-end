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
import { useProductsQuery } from '@/lib/hooks/useProductsQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

    const currentPageParam = searchParams.get('page');
    const initialPage = currentPageParam ? parseInt(currentPageParam) : 1;

    const validInitialPage = Math.max(1, Math.min(initialPage, totalPages));
    const [currentPage, setCurrentPage] = useState(validInitialPage);

    useEffect(() => {
        if (currentPageParam) {
            const pageNum = parseInt(currentPageParam);
            if (
                pageNum >= 1 &&
                pageNum <= totalPages &&
                pageNum !== currentPage
            ) {
                setCurrentPage(pageNum);
            }
        } else if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPageParam, totalPages, currentPage]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const getPageNumbers = () => {
        const maxVisible = 5;
        const pageNumbers = new Set<number>();

        //To always show first and last page
        pageNumbers.add(1);
        pageNumbers.add(totalPages);

        // Calculate range around current page
        const rangeStart = Math.max(
            2,
            currentPage - Math.floor((maxVisible - 2) / 2)
        );
        const rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisible - 3);

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pageNumbers.add(i);
        }
        return Array.from(pageNumbers).sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination
            aria-label='Product pagination'
            className='mx-auto mt-auto flex w-full justify-center pt-6'
        >
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        className={
                            currentPage === 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>

                {pageNumbers.map((page, index) => {
                    const ellipsisBefore =
                        index > 0 && pageNumbers[index - 1] !== page - 1;

                    return (
                        <React.Fragment key={page}>
                            {ellipsisBefore && (
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
                                    className='hover:bg-primary-active'
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
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
