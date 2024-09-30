/* eslint-disable no-console */
// to prevent failed build due to console.log
// TODO: remove the console log once the backend is ready to accept data
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
import { useEffect, useState } from 'react';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { FilterState, useFilter } from '@/context/FilterContext';

// Zod Schema for validation
const FilterSchema = z.object({
    types: z.array(z.string()).optional(),
    brands: z.array(z.string()).optional(),
    priceRanges: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    stock: z.array(z.string()).optional(),
});

// Mock filter options
export const filterOptions = {
    types: ['Mobile phones', 'Accessories'],
    brands: ['Samsung', 'Xiaomi', 'Apple', 'OnePlus', 'Sony'],
    priceRanges: [
        '0 - 100 €/month',
        '100 - 500 €/month',
        '500 - 1000 €/month',
        '1000 - 1500 €/month',
        '1500 - 2000 €/month',
    ],
    colors: ['Black', 'Yellow', 'Blue', 'Pink', 'Silver'],
    stock: ['In stock', 'Out of stock'],
};

type FilterFormType = z.infer<typeof FilterSchema>;

export const FilterModal: React.FC = () => {
    const { selectedFilters, handleFilterChange, setIsModalOpen, isModalOpen } =
        useFilter();
    const [resultCount, setResultCount] = useState(0);

    // react-hook-form for state management and form validation
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

    useEffect(() => {
        // Mock result count, replace this with a future backend API call.
        console.log('Filters changed:', selectedFilters);
        setResultCount(21);
    }, [selectedFilters]);

    const handleSubmit = (data: FilterFormType) => {
        console.log('Selected Filters:', data);
        setIsModalOpen(false);
    };

    const filterSections = [
        {
            name: 'types' as keyof FilterState,
            title: 'Type',
            options: filterOptions.types,
        },
        {
            name: 'brands' as keyof FilterState,
            title: 'Brand',
            options: filterOptions.brands,
        },
        {
            name: 'priceRanges' as keyof FilterState,
            title: 'Price',
            options: filterOptions.priceRanges,
        },
        {
            name: 'colors' as keyof FilterState,
            title: 'Color',
            options: filterOptions.colors,
        },
        {
            name: 'stock' as keyof FilterState,
            title: 'Stock',
            options: filterOptions.stock,
        },
    ];

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
            <DialogContent className='flex max-h-screen flex-col overflow-y-auto p-4 [&>button]:hidden'>
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
