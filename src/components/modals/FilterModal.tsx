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

// Zod Schema for validation
const FilterSchema = z.object({
    types: z.array(z.string()).optional(),
    brands: z.array(z.string()).optional(),
    priceRanges: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    stock: z.array(z.string()).optional(),
});

// Mock filter options
const filterOptions = {
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    // react-hook-form for state management and form validation
    const form = useForm<FilterFormType>({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            types: [],
            brands: [],
            priceRanges: [],
            colors: [],
            stock: [],
        },
    });

    const handleFilterChange = () => {
        const filterValues = form.getValues();
        console.log('Selected Filters:', filterValues);
        //  trigger a side effect like a data fetch and filter.
    };

    const handleSubmit = (data: FilterFormType) => {
        console.log('Selected Filters:', data);
        setIsModalOpen(false);
    };

    const filterSections = [
        { name: 'types', title: 'Type', options: filterOptions.types },
        { name: 'brands', title: 'Brand', options: filterOptions.brands },
        {
            name: 'priceRanges',
            title: 'Price',
            options: filterOptions.priceRanges,
        },
        { name: 'colors', title: 'Color', options: filterOptions.colors },
        { name: 'stock', title: 'Stock', options: filterOptions.stock },
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
            <DialogContent className='max-h-[90vh] overflow-y-auto p-4'>
                <DialogTitle>Filter By</DialogTitle>
                <DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-6'
                        >
                            <FilterCheckboxGroup
                                form={form}
                                filterSections={filterSections}
                                handleFilterChange={handleFilterChange}
                            />
                            <Button type='submit'>See results</Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
