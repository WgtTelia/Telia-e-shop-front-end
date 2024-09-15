'use client';
import React from 'react';
import { useSort } from '@/context/SortContext';
import { Button } from '@/components/ui/button';
import { LuArrowDownUp } from 'react-icons/lu';
import { SortSheet } from '@/components/filters/SortSheet';


export const SortButton: React.FC = () => {
  const { sortOption, setIsSheetOpen } = useSort();

  const handleSortClick = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <Button
        variant='filter'
        icon={<LuArrowDownUp />}
        iconPosition='left'
        onClick={handleSortClick}
      >
        {sortOption}
      </Button>
      <SortSheet />
    </>
  );
};
