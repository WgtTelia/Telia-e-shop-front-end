import { SortRadioGroup } from '@/components/filters/SortRadioGroup';
import { FilterCheckboxesGroup } from '@/components/filters/FilterCheckboxesGroup';

export const Filters = () => {
    return (
        <div className='hidden lg:col-span-1 lg:block'>
            <FilterCheckboxesGroup />
            <SortRadioGroup />
        </div>
    );
};
