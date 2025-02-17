'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { useEffect } from 'react';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { useFilter } from '@/context/FilterContext';
import { getFilterSections } from '@/lib/utils/filterUtils';
import {
    filterCategories,
    FilterFormType,
    FilterSchema,
} from '@/lib/utils/validationSchemas';

export const FilterModal: React.FC = () => {
    const {
        selectedFilters,
        handleFilterChange,
        setIsModalOpen,
        isModalOpen,
        filterCount,
    } = useFilter();

    const form = useForm<FilterFormType>({
        resolver: zodResolver(FilterSchema),
    });

    const handleSubmit = (data: FilterFormType) => {
        filterCategories.forEach((category) => {
            handleFilterChange(category, data[category] || []);
        });
        setIsModalOpen(false);
    };

    const filterSections = getFilterSections(selectedFilters);

    useEffect(() => {
        if (isModalOpen) {
            form.setValue('types', selectedFilters.productGroups);
            form.setValue('brands', selectedFilters.brands);
            form.setValue('priceRanges', selectedFilters.priceIntervals);
            form.setValue('colors', selectedFilters.colors);
            form.setValue('stock', selectedFilters.stockOptions);
        }
    }, [isModalOpen, selectedFilters, form]);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant='filter'
                    icon={<PiSlidersHorizontalBold />}
                    iconPosition='left'
                    aria-label='Filter'
                >
                    Filter by
                </Button>
            </DialogTrigger>
            <DialogContent className='flex max-h-screen flex-col p-4 [&>button]:hidden'>
                <DialogTitle>Filter By</DialogTitle>
                <DialogDescription className='sr-only'>
                    Filter options
                </DialogDescription>
                <div className='flex grow flex-col overflow-y-auto pb-16'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='w-full space-y-4 overflow-y-auto'
                            data-testid='filter-modal-form'
                        >
                            <FilterCheckboxGroup
                                form={form}
                                filterSections={filterSections}
                                handleFilterChange={handleFilterChange}
                            />
                            <div className='absolute inset-x-0 bottom-0 z-50 flex flex-wrap justify-between gap-4 border-t border-slate-200 bg-grey-100 p-4'>
                                <Button
                                    variant='close'
                                    onClick={() => setIsModalOpen(false)}
                                    className='flex-1'
                                    data-testid='modal-close'
                                >
                                    Close
                                </Button>
                                <Button
                                    type='submit'
                                    variant='secondary'
                                    onClick={form.handleSubmit(handleSubmit)}
                                    className='flex-1'
                                >
                                    See results ({filterCount})
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
