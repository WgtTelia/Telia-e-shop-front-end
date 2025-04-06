'use client';
import { Button } from '@/components/ui/button';
import { SORT_OPTIONS, useSort } from '@/context/SortContext';
import { getPosition } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

interface SortDropdownProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ buttonRef }) => {
    const { sortOption, setSortOption, setIsDropDownOpen } = useSort();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropDownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef, setIsDropDownOpen]);

    const handleSortOptionChange = (option: SortOptionType) => {
        setSortOption(option.value);
        setIsDropDownOpen(false);
    };

    return (
        <div
            ref={dropdownRef}
            className='absolute left-0 z-50 mt-2 min-w-dropdown-min rounded-lg border border-gray-800 bg-gray-650 px-0.5 py-1.5 shadow-lg'
            style={getPosition(buttonRef)}
            data-testid='dropdown'
            role='listbox'
        >
            <div className='flex flex-col'>
                <label className='pl-dropdown-label text-grey-50'>
                    Choose...
                </label>
                {SORT_OPTIONS.map((option: SortOptionType) => (
                    <Button
                        key={option.value}
                        variant='ghost'
                        role='option'
                        size='picker'
                        onClick={() => handleSortOptionChange(option)}
                        className='w-full justify-start rounded-none border-none text-white transition-colors duration-150 ease-in-out hover:text-white'
                        icon={
                            <span className='mr-0.5 inline-block w-2 pt-1'>
                                {sortOption === option.value && (
                                    <IoCheckmarkSharp className='text-gray-850' />
                                )}
                            </span>
                        }
                        iconPosition='left'
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};
