'use client';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { LuArrowDownUp } from 'react-icons/lu';
import { useSort } from '@/context/SortContext';
import { Button } from '@/components/ui/button';
import { SortMenuSheet } from '@/components/filters/SortMenuSheet';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

import { SortDropdown } from '@/components/filters/SortDropdown';

export const SortButton: React.FC = () => {
    const { sortOption, setIsSheetOpen, setIsDropDownOpen, isDropDownOpen } =
        useSort();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const isMobileScreen = useMediaQuery('(max-width: 768px)');

    const isMediumScreen = useMediaQuery(
        '(min-width: 769px) and (max-width: 1439px)'
    );

    const handleSortClick = () => {
        if (isMobileScreen) {
            setIsSheetOpen(true);
        } else if (isMediumScreen) {
            setIsDropDownOpen(!isDropDownOpen);
        }
    };

    return (
        <>
            <Button
                ref={buttonRef}
                variant='filter'
                icon={<LuArrowDownUp />}
                iconPosition='left'
                onClick={handleSortClick}
                aria-label='Sort'
            >
                {sortOption}
            </Button>
            {isMobileScreen && <SortMenuSheet data-testid='select-menu' />}
            {isMediumScreen &&
                isDropDownOpen &&
                createPortal(
                    <SortDropdown buttonRef={buttonRef} />,
                    document.body // portal to avoid layout disruption
                )}
        </>
    );
};
