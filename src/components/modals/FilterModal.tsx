'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useState } from 'react';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { useFilter } from '@/context/FilterContext';
import { getFilterSections } from '@/lib/filterUtils';

const filterArraySchema = z.array(z.string()).optional();
const filterCategories = [
    'types',
    'brands',
    'priceRanges',
    'colors',
    'stock',
] as const;

const FilterSchema = z.object(
    Object.fromEntries(
        filterCategories.map((field) => [field, filterArraySchema])
    )
);

type FilterFormType = z.infer<typeof FilterSchema>;

export const FilterModal: React.FC = () => {
    const { selectedFilters, handleFilterChange, setIsModalOpen, isModalOpen } =
        useFilter();
    const [resultCount, setResultCount] = useState(0);

    const form = useForm<FilterFormType>({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            types: selectedFilters.types,
            brands: selectedFilters.brands,
            priceRanges: selectedFilters.priceRanges,
            colors: selectedFilters.colors,
            stock: selectedFilters.stock,
        },
    });

    const handleSubmit = (data: FilterFormType) => {
        handleFilterChange('types', data.types || []);
        handleFilterChange('brands', data.brands || []);
        handleFilterChange('priceRanges', data.priceRanges || []);
        handleFilterChange('colors', data.colors || []);
        handleFilterChange('stock', data.stock || []);
        setIsModalOpen(false);
    };

    const filterSections = getFilterSections(selectedFilters);

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
                                >
                                    Close
                                </Button>
                                <Button
                                    type='submit'
                                    variant='secondary'
                                    onClick={form.handleSubmit(handleSubmit)}
                                    className='flex-1'
                                >
                                    See results ({resultCount})
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
