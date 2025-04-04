'use client';
import { FilterCheckboxGroup } from '@/components/filters/FilterCheckboxGroup';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useFilter } from '@/context/FilterContext';
import { useFilteredProductsByStock } from '@/lib/hooks/useFilteredProductsByStock';
import { getFilterSections } from '@/lib/utils/filterUtils';
import {
    filterCategories,
    FilterFormType,
    FilterSchema,
} from '@/lib/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PiSlidersHorizontalBold } from 'react-icons/pi';

export const FilterModal: React.FC = () => {
    const { selectedFilters, setIsModalOpen, isModalOpen } = useFilter();
    const { filteredProducts: products } = useFilteredProductsByStock();
    const searchParams = useSearchParams();
    const router = useRouter();

    const filterCount = products?.length ?? 0;

    const form = useForm<FilterFormType>({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            productGroups: [],
            brands: [],
            priceIntervals: [],
            colors: [],
            stockOptions: [],
        },
    });

    const filterSections = getFilterSections(selectedFilters);

    useEffect(() => {
        if (isModalOpen) {
            const formValues: Partial<FilterFormType> = {};
            filterCategories.forEach((category) => {
                formValues[category] = selectedFilters[category];
            });
            form.reset(formValues);
        }
    }, [isModalOpen, selectedFilters, form]);

    const handleSubmit = (data: FilterFormType) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        router.push(`?${params.toString()}`, { scroll: false });
        setIsModalOpen(false);
        // eslint-disable-next-line no-console
        console.log('Form submitted with data:', data);
        setIsModalOpen(false);
    };
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
                            />
                            <div className='absolute inset-x-0 bottom-0 z-50 flex flex-wrap justify-between gap-4 border-t border-slate-200 bg-grey-100 p-4'>
                                <Button
                                    variant='close'
                                    className='flex-1'
                                    data-testid='modal-close'
                                    type='button'
                                    onClick={() => {
                                        form.handleSubmit(handleSubmit)();
                                    }}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant='secondary'
                                    className='flex-1'
                                    type='submit'
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
