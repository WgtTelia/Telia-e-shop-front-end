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

interface PaginationGroupProps {
    className?: string;
    itemsPerPage?: number;
}
export const defaultItemsPerPage = 5;

export const PaginationGroup: React.FC<PaginationGroupProps> = ({
    className,
    itemsPerPage = defaultItemsPerPage,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data } = useProductsQuery();
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
        const pageNumbers = new Set<number>();
        pageNumbers.add(1);
        pageNumbers.add(totalPages);

        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(totalPages - 1, currentPage + 1);
            i++
        ) {
            pageNumbers.add(i);
        }

        return Array.from(pageNumbers).sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }

    console.log(totalProducts, 'totalProducts');
    console.log(itemsPerPage, 'itemsPerPage');

    return (
        <div className={`justify-self-end ${className ?? ''}`}>
            <Pagination aria-label='Product pagination'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : 0}
                            className={
                                currentPage === 1
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                            }
                        />
                    </PaginationItem>

                    {pageNumbers.map((page, index) => {
                        const needsEllipsisBefore =
                            index > 0 && pageNumbers[index - 1] !== page - 1;

                        return (
                            <React.Fragment key={page}>
                                {needsEllipsisBefore && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationLink
                                        href={`?page=${page}`}
                                        isActive={currentPage === page}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page);
                                        }}
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
                                    : ''
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
