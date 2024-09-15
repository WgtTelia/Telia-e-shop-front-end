'use client';
import React, { useState } from 'react';
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


const SORT_OPTIONS: SortOption[] = [
  'Most popular',
  'Price: lowest to highest',
  'Price: highest to lowest',
];

export const SortSheet: React.FC = () => {
  const { setSortOption, isSheetOpen, setIsSheetOpen } = useSort();
  const [selectedOption, setSelectedOption] = useState<SortOption>(SORT_OPTIONS[0]);

  const handleSortOptionChange = (option: string) => {
    const typedOption = option as SortOption; 
    setSelectedOption(typedOption);
    setSortOption(typedOption);
    setIsSheetOpen(false);
  };
//TODO: style the icons and fix SheetTitle; 
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div style={{ display: 'none' }}>Trigger</div>
      </SheetTrigger>
      <SheetContent>
        <div className ='bg-gray-950 py-2.5 text-white absolute top-0 left-0 w-full flex flex-row justify-between items-center px-3'> 
        <div className='flex items-center gap-1 text-white underline-offset-4'>
          <FaChevronDown />
          <FaChevronUp />
        </div>
        <SheetClose asChild>
          <button className='justify-self-end text-white underline-offset-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800'>
            Done
          </button>
        </SheetClose>
        </div>
        <SheetHeader >
          <SheetTitle>Choose...</SheetTitle>
        </SheetHeader>
        <div className='grid gap-1 py-1 w-full '>
        <Picker
            options={SORT_OPTIONS}
            selectedOption={selectedOption}
            onChange={handleSortOptionChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
