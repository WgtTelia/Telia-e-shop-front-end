//TODO:

// //1. Location of the [      <DropdownMenuTrigger asChild>
//         <Button variant="outline">Open</Button> // display none  -
//         </DropdownMenuTrigger>
//   ] // query selector for the id

//regular div, relative and absolute  positing, z-index need, selected should go to the state (sortOption);  this wont apply

//test: click on the button, if clicked btn text changed;
//check mark in from of select option
//

//axios || React Query ;
//watch for the sort changes in the product; - Product should use the SOrt State  (listen )

//localstorage - for the selected options; (filters and sort) -optional;
//TODO
'use client'

import React from 'react'
import { useSort } from '@/context/SortContext'
import { Button } from '@/components/ui/button'
import { SORT_OPTIONS } from '@/data/sortOption'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

export const SortDropdown: React.FC = () => {
  const { sortOption, setSortOption, isDropDownOpen, setIsDropDownOpen } =
    useSort()

  const moveSelection = (direction: 'up' | 'down') => {
    const currentIndex = SORT_OPTIONS.indexOf(sortOption)
    const newIndex =
      direction === 'up'
        ? (currentIndex - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length
        : (currentIndex + 1) % SORT_OPTIONS.length

    const newOption = SORT_OPTIONS[newIndex]
    setSortOption(newOption)
  }

  const handleSortOptionChange = (option: string) => {
    setSortOption(option as SortOption)
    setIsDropDownOpen(false) // Close dropdown after selecting option
  }

  return (
    isDropDownOpen && (
      <div className='absolute left-0 z-50 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg'>
        <div className='flex items-center justify-between px-4 py-2'>
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
            onClick={() => setIsDropDownOpen(false)}
            aria-label='Close Dropdown'
            size='icon'
          >
            Close
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

        {/* Sort Options List */}
        <div className='flex flex-col gap-1 px-4 py-2'>
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={sortOption === option ? 'default' : 'ghost'}
              onClick={() => handleSortOptionChange(option)}
              className={`w-full px-4 py-2 text-left ${
                sortOption === option
                  ? 'bg-purple-100 font-semibold text-purple-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {sortOption === option && <span className='mr-2'>✔</span>}{' '}
              {/* Checkmark for selected option */}
              {option}
            </Button>
          ))}
        </div>
      </div>
    )
  )
}
