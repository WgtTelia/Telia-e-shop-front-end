// src/lib/hooks/usePagination.ts
import { useMemo } from 'react';

const DEFAULT_MAX_VISIBLE_PAGES = 5;

interface UsePaginationOptions {
    totalPages: number;
    currentPage: number;
    /** Maximum number of page links to display (including first/last, excluding ellipsis) */
    maxVisible?: number;
}

interface UsePaginationReturn {
    pageNumbers: number[];
}

export const usePagination = ({
    totalPages,
    currentPage,
    maxVisible = DEFAULT_MAX_VISIBLE_PAGES,
}: UsePaginationOptions): UsePaginationReturn => {
    const pageNumbers = useMemo(() => {
        // if not enough pages to paginate
        if (totalPages <= 1) {
            return [];
        }

        const pages = new Set<number>();

        pages.add(1);
        if (totalPages > 1) {
            pages.add(totalPages);
        }

        const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

        // this calculates  number of pages to show between the first and last
        const maxInnerPages = Math.max(0, maxVisible - 2); //  Subtract 2 for the first and last pages that are always shown (if distinct)

        // this calculates the start and end of the range around the current page
        let rangeStart = Math.max(
            2, // Must be at least page 2
            validCurrentPage - Math.floor(maxInnerPages / 2)
        );
        let rangeEnd = Math.min(
            totalPages - 1, // must be at most the second to last page
            rangeStart + maxInnerPages - 1
        );

        // this adjusts range if it bumps against the start or end boundaries
        if (rangeStart === 2 && rangeEnd < totalPages - 1) {
            // If range starts at 2, extend the end if possible
            rangeEnd = Math.min(totalPages - 1, 2 + maxInnerPages - 1);
        } else if (rangeEnd === totalPages - 1 && rangeStart > 2) {
            // If range ends at totalPages - 1, extend the start backwards if possible
            rangeStart = Math.max(2, totalPages - 1 - maxInnerPages + 1);
        }

        // Add the calculated range of pages
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.add(i);
        }

        return Array.from(pages).sort((a, b) => a - b);
    }, [totalPages, currentPage, maxVisible]);

    return { pageNumbers };
};
