'use client'
import React from 'react'
import { useSort } from '@/context/SortContext'
import { Button } from '@/components/ui/button'
import { LuArrowDownUp } from 'react-icons/lu'
import { SelectMenu } from '@/components/filters/SelectMenu'
import { SortDropdown } from './SortDropdown'

export const SortButton: React.FC = () => {
  const { sortOption, setIsSheetOpen, setIsDropDownOpen, isDropDownOpen } =
    useSort()

  const handleSortClick = () => {
    const screenWidth = window.innerWidth

    if (screenWidth <= 768) {
      setIsSheetOpen(true)
    } else if (screenWidth > 769 && screenWidth <= 1439) {
      setIsDropDownOpen(!isDropDownOpen)
    }
  }

  //test based on screen size - slect shown
  return (
    <>
      <Button
        variant='filter'
        icon={<LuArrowDownUp />}
        iconPosition='left'
        onClick={handleSortClick}
      >
        {sortOption}
      </Button>
      <SelectMenu />
      {/* Show SortDropdown on medium screens */}
      {isDropDownOpen && <SortDropdown />}
    </>
  )
}
