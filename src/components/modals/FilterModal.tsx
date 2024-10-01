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
import { useFilter } from '@/context/FilterContext';
import { formatPriceRange } from '@/lib/utils';

// Zod Schema for validation
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

// Mock filter options
export const filterOptions = {
    types: ['Mobile phones', 'Accessories'],
    brands: [
        'Samsung',
        'Xiaomi',
        'Apple',
        'POCO',
        'Nokia',
        'Sony',
        'Redmi',
        'LG',
    ],
    price_intervals: [
        'price_monthly_0_10',
        'price_monthly_10_50',
        'price_monthly_50_100',
        'price_monthly_100_150',
        'price_monthly_150_200',
    ],
    colors: [
        'Black',
        'Blue',
        'White',
        'Green',
        'Purple',
        'Grey',
        'Yellow',
        'Silver',
        'Pink',
        'Red',
        'Almond',
        'Lavender',
        'Orange',
    ],
    stock: ['In Stock', 'Out of Stock'],
};

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
            name: 'types' as keyof Filter,
            title: 'Type',
            options: filterOptions.types,
        },
        {
            name: 'brands' as keyof Filter,
            title: 'Brand',
            options: filterOptions.brands,
        },
        {
            name: 'priceRanges' as keyof Filter,
            title: 'Price',
            options: filterOptions.price_intervals.map(formatPriceRange),
        },
        {
            name: 'colors' as keyof Filter,
            title: 'Color',
            options: filterOptions.colors,
        },
        {
            name: 'stock' as keyof Filter,
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
