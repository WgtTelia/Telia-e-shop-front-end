import { SortButton } from '@/components/filters/SortButton';
import { FilterModal } from '@/components/modals/FilterModal';

export const FilterButtonsContainer: React.FC = () => {
    return (
        <div className='mb-6 flex flex-wrap gap-4 xl:hidden'>
            <FilterModal />
            <SortButton />
        </div>
    );
};
