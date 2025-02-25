'use client';
import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetDescription,
} from '@/components/ui/sheet';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { OptionPicker } from '@/components/filters/OptionPicker';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export const SortMenuSheet: React.FC = () => {
    const { setSortOption, isSheetOpen, setIsSheetOpen, sortOption } =
        useSort();

    const moveSelection = (direction: 'up' | 'down') => {
        const currentIndex = SORT_OPTIONS.findIndex(
            (opt) => opt.value === sortOption
        );
        const newIndex =
            direction === 'up'
                ? (currentIndex - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length
                : (currentIndex + 1) % SORT_OPTIONS.length;

        const newOption = SORT_OPTIONS[newIndex];
        setSortOption(newOption.value);
    };

    const handleSortOptionChange = (option: SortOption) => {
        setSortOption(option.value);
        setIsSheetOpen(false);
    };

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <div className='hidden'>Trigger</div>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className='pt-10'>Choose...</SheetTitle>
                <SheetHeader>
                    {/*VisuallyHidden is important to have shadcn sheet component works without the errors  */}
                    <VisuallyHidden.Root>
                        <SheetDescription />
                    </VisuallyHidden.Root>
                </SheetHeader>
                <div className='absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-gray-950 px-1 text-white'>
                    <div className='flex items-center text-white'>
                        <Button
                            variant='action'
                            onClick={() => moveSelection('up')}
                            aria-label='Move Up'
                            size='icon'
                        >
                            <FaChevronUp data-testid='chevron-up' />
                        </Button>
                        <Button
                            variant='action'
                            onClick={() => moveSelection('down')}
                            aria-label='Move Down'
                            size='icon'
                        >
                            <FaChevronDown data-testid='chevron-down' />
                        </Button>
                    </div>
                    <SheetClose asChild>
                        <Button variant='action' role='button' size='xs'>
                            Done
                        </Button>
                    </SheetClose>
                </div>
                <div className='grid w-full gap-1 py-1'>
                    <OptionPicker
                        options={SORT_OPTIONS}
                        selectedOption={sortOption}
                        onChange={handleSortOptionChange}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
};
