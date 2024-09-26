import { SortButton } from '@/components/filters/SortButton';
import { FilterButton } from './FilterButton';

export const FilterButtonsContainer: React.FC = () => {
    return (
        <div className='mb-6 flex flex-wrap gap-4 lg:hidden'>
            <FilterButton />
            <SortButton />
        </div>
    );
};
