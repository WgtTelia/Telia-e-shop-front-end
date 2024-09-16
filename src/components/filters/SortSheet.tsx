'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useSort } from '@/context/SortContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Picker } from '@/components/filters/Picker';
import { Button } from '@/components/ui/button';

const SORT_OPTIONS: SortOption[] = [
  'Most popular',
  'Price: lowest to highest',
  'Price: highest to lowest',
];

export const SortSheet: React.FC = () => {
  const { setSortOption, isSheetOpen, setIsSheetOpen, sortOption } = useSort();

  // Move the selected option index up or down
  const moveSelection = (direction: 'up' | 'down') => {
    const currentIndex = SORT_OPTIONS.indexOf(sortOption);
    const newIndex =
      direction === 'up'
        ? (currentIndex === 0 ? SORT_OPTIONS.length : currentIndex) - 1
        : (currentIndex + 1) % SORT_OPTIONS.length;

    const newOption = SORT_OPTIONS[newIndex];
    setSortOption(newOption);
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option as SortOption);
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div style={{ display: 'none' }}>Trigger</div>
      </SheetTrigger>
      <SheetContent>
        <div className='absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-gray-950 px-1 py-2 text-white'>
          <div className='flex items-center text-white'>
            <Button
              variant='action'
              onClick={() => moveSelection('up')}
              aria-label='Move Up'
              size='icon'
            >
              <FaChevronUp />
            </Button>
            <Button
              variant='action'
              onClick={() => moveSelection('down')}
              aria-label='Move Down'
              size='icon'
            >
              <FaChevronDown />
            </Button>
          </div>
          <SheetClose asChild>
            <Button variant='action' role='option' size='sm'>
              Done
            </Button>
          </SheetClose>
        </div>
        <SheetHeader>
          <SheetTitle>Choose...</SheetTitle>
        </SheetHeader>
        <div className='grid w-full gap-1 py-1'>
          <Picker
            options={SORT_OPTIONS}
            selectedOption={sortOption}
            onChange={handleSortOptionChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
