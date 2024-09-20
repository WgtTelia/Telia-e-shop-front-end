'use client'
import { Button } from '@/components/ui/button'
import { PiSlidersHorizontalBold } from 'react-icons/pi'
import { SortButton } from '@/components/filters/SortButton'

export const FilterButtonsContainer: React.FC = () => {
  const handleFilterClick = () => {
    alert('Filter button clicked')
    // logic to open the filter modal here or modalContext
  }

  return (
    <div className='mb-6 flex flex-wrap gap-4 lg:hidden'>
      <Button
        variant='filter'
        icon={<PiSlidersHorizontalBold />}
        iconPosition='left'
        onClick={handleFilterClick}
      >
        Filter by
      </Button>
      <SortButton />
    </div>
  )
}
