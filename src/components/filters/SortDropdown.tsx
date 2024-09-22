'use client'
import React, { useState } from 'react'
import { useSort } from '@/context/SortContext'
import { Button } from '@/components/ui/button'
import { SORT_OPTIONS } from '@/data/sortOption'
import { IoCheckmarkSharp } from 'react-icons/io5'

interface SortDropdownProps {
  buttonRef: React.RefObject<HTMLButtonElement>
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ buttonRef }) => {
  const { sortOption, setSortOption, setIsDropDownOpen } = useSort()
  const [hoveredOption, setHoveredOption] = useState<SortOption | null>(null)

  const handleSortOptionChange = (option: string) => {
    setSortOption(option as SortOption)
    setIsDropDownOpen(false)
  }

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option as SortOption)
  }

  const handleMouseLeave = () => {
    setHoveredOption(null)
  }

  const getPosition = () => {
    if (!buttonRef.current) return { top: 0, left: 0 }
    return {
      top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight,
      left: buttonRef.current.offsetLeft,
    }
  }

  return (
    <div
      className='absolute left-0 z-50 mt-2 min-w-dropdown-min rounded-lg border border-gray-800 bg-gray-650 px-0.5 py-1.5 shadow-lg'
      style={getPosition()}
    >
      <div className='flex flex-col'>
        <label className='pl-dropdown-label text-grey-50'>Choose...</label>
        {SORT_OPTIONS.map((option) => (
          <Button
            key={option}
            variant='ghost'
            role='option'
            size='picker'
            onClick={() => handleSortOptionChange(option)}
            onMouseEnter={() => handleMouseEnter(option)}
            onMouseLeave={handleMouseLeave}
            className='w-full justify-start rounded-none border-none text-white transition-colors duration-150 ease-in-out hover:text-white'
            icon={
              <span className='mr-0.5 inline-block w-2 pt-1'>
                {(sortOption === option || hoveredOption === option) && (
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
  )
}
