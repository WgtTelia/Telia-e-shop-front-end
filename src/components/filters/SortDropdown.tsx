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

'use client'
import React from 'react'
import { useSort } from '@/context/SortContext'
import { Button } from '@/components/ui/button'
import { SORT_OPTIONS } from '@/data/sortOption'
import { IoCheckmarkSharp } from 'react-icons/io5'

export const SortDropdown: React.FC = () => {
  const { sortOption, setSortOption, setIsDropDownOpen } = useSort()

  const handleSortOptionChange = (option: string) => {
    setSortOption(option as SortOption)
    setIsDropDownOpen(false) // Close dropdown after selecting option
  }

  return (
    <div className='absolute left-0 z-50 mt-2 w-[296px] rounded-md bg-[#868685] p-3 shadow-lg'>
      {' '}
      {/* Apply styles here */}
      {/* Sort Options List */}
      <div className='flex flex-col gap-1'>
        {SORT_OPTIONS.map((option) => (
          <Button
            key={option}
            variant={sortOption === option ? 'default' : 'ghost'}
            onClick={() => handleSortOptionChange(option)}
            className={`w-full justify-start px-4 py-2 text-left ${
              sortOption === option
                ? 'bg-gray-600 font-semibold text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {sortOption === option && <IoCheckmarkSharp className='mr-2' />}{' '}
            {/* Checkmark for selected option */}
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
