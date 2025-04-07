'use client';

import { Button } from '@/components/ui/button';
import { getPosition } from '@/lib/utils'; //
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';

interface ItemsPerPageSelectorProps {
    options?: number[];
    defaultOption?: number;
}

export const defaultItemsPerPage = 3;
const defaultOptions = [defaultItemsPerPage, 6, 9];

export const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
    options = defaultOptions,
    defaultOption = defaultItemsPerPage,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedItemsPerPage, setSelectedItemsPerPage] =
        useState(defaultOption);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const pageSizeFromUrl = searchParams.get('pageSize');
        if (
            pageSizeFromUrl &&
            parseInt(pageSizeFromUrl) !== selectedItemsPerPage
        ) {
            setSelectedItemsPerPage(parseInt(pageSizeFromUrl));
        }
    }, [searchParams, selectedItemsPerPage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsDropdownOpen]);

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setSelectedItemsPerPage(newItemsPerPage);
        const params = new URLSearchParams(searchParams);
        params.set('pageSize', String(newItemsPerPage));
        params.set('page', '1');
        router.push(`?${params.toString()}`, { scroll: false });
        setIsDropdownOpen(false);
    };

    return (
        <div className='relative my-6 inline-block self-end'>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
                <p className='font-medium text-gray-750'> Items per page:</p>
                <Button
                    data-testid='items-per-page-button'
                    ref={buttonRef}
                    variant='outline'
                    size='xs'
                    iconPosition='left'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='text-xl'
                    title='Choose items per page'
                >
                    {selectedItemsPerPage}
                    <RiArrowDownSLine
                        className={`size-8 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </div>

            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className='absolute right-0 z-50 mt-2 flex w-1/2 flex-row justify-center justify-self-end rounded-lg border border-gray-800 bg-gray-650 px-0.5 py-1.5 shadow-lg'
                    style={getPosition(buttonRef)}
                    data-testid='dropdown'
                    role='listbox'
                >
                    <div className='flex flex-col'>
                        {options.map((option) => (
                            <Button
                                key={option}
                                variant='ghost'
                                role='option'
                                size='picker'
                                onClick={() => handleItemsPerPageChange(option)}
                                className='w-full justify-start rounded-none border-none text-white transition-colors duration-150 ease-in-out hover:text-white'
                                icon={
                                    <span className='mr-0.5 inline-block w-2 pt-1'>
                                        {selectedItemsPerPage === option && (
                                            <IoCheckmarkSharp className='text-gray-850' />
                                        )}
                                    </span>
                                }
                                iconPosition='left'
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
