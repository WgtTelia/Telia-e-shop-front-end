'use client';
import { Button } from '@/components/ui/button';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { LuArrowDownUp } from 'react-icons/lu';

export const FilterButtonsContainer: React.FC = () => {
  const handleFilterClick = () => {
    alert('Filter button clicked');
    // logic to open the filter modal here or modalContext
  };

  const handleSortClick = () => {
    alert('Sort button clicked');
    // logic to open the sort action sheet or dropdown here, or modalContext
  };

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:justify-start lg:hidden'>
      <Button
        variant='outline'
        icon={<PiSlidersHorizontalBold />}
        iconPosition='left'
        className='px-5'
        onClick={handleFilterClick}
      >
        Filter by
      </Button>
      <Button
        variant='outline'
        icon={<LuArrowDownUp />}
        iconPosition='left'
        className='px-5'
        onClick={handleSortClick}
      >
        Most popular
      </Button>
    </div>
  );
};
