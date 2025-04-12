'use client';

import { Button } from '@/components/ui/button';
import { getPosition } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';

interface ResultsPerPageSelectorProps {
    options?: number[];
    defaultOption?: number;
}

//TODO: adjust this when the backend is ready
export const defaultItemsPerPage = 3;
const defaultOptions = [defaultItemsPerPage, 6, 9];

export const ResultsPerPageSelector: React.FC<ResultsPerPageSelectorProps> = ({
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
        <div className='my-6 inline-block self-end'>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
                <p className='font-medium text-gray-750'> Results per page:</p>
                <Button
                    data-testid='items-per-page-button'
                    ref={buttonRef}
                    variant='ghost'
                    size='xs'
                    className='border-input relative border border-primary-dark shadow-sm'
                    iconPosition='left'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    title='Choose items per page'
                    aria-haspopup='listbox'
                    aria-expanded={isDropdownOpen}
                    aria-controls='dropdown'
                >
                    {selectedItemsPerPage}
                    <RiArrowDownSLine
                        className={`size-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </div>

            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className='absolute z-10 mt-2 flex flex-row justify-center justify-self-end rounded-lg border border-gray-800 bg-gray-650 px-3.5 shadow-lg'
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
                                    <span className='mr-1 inline-block w-2 pt-1'>
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
