'use client';
import React from 'react';
import { useSort } from '@/context/SortContext';
import { Button } from '@/components/ui/button';
import { LuArrowDownUp } from 'react-icons/lu';

export const SortButton: React.FC = () => {
  const { sortOption } = useSort();

  const handleSortClick = () => {
    alert('Sort button clicked');
  };

  return (
    <Button
      variant='filter'
      icon={<LuArrowDownUp />}
      iconPosition='left'
      className='px-5'
      onClick={handleSortClick}
    >
      {sortOption}
    </Button>
  );
};
