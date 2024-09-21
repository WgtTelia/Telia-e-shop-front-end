'use client'
import React from 'react'
import { useSort } from '@/context/SortContext'
import { Button } from '@/components/ui/button'
import { LuArrowDownUp } from 'react-icons/lu'
import { SelectMenu } from '@/components/filters/SelectMenu'
import { SortDropdown } from './SortDropdown'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export const SortButton: React.FC = () => {
  const { sortOption, setIsSheetOpen, setIsDropDownOpen, isDropDownOpen } =
    useSort()

  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1439px)'
  )

  const handleSortClick = () => {
    const screenWidth = window.innerWidth

    if (screenWidth <= 768) {
      setIsSheetOpen(true)
    } else if (isMediumScreen) {
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
      {isMediumScreen && isDropDownOpen && <SortDropdown />}
    </>
  )
}
