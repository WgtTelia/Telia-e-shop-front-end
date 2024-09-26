'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { useFilter } from '@/context/FilterContext';

export const FilterButton: React.FC = () => {
    const { isModalOpen, setIsModalOpen } = useFilter();

    const handleFilterClick = () => {
        setIsModalOpen(!isModalOpen);
        console.log('Modal is open');
    };

    return (
        <Button
            variant='filter'
            icon={<PiSlidersHorizontalBold />}
            iconPosition='left'
            onClick={handleFilterClick}
            aria-label='Filter'
        >
            Filter by
        </Button>
    );
};
