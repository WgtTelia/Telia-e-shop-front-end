import { z } from 'zod';

const filterArraySchema = z.array(z.string()).optional();
export const filterCategories: Array<keyof FilterOptions> = [
    'productGroups',
    'brands',
    'priceIntervals',
    'colors',
    'stockOptions',
] as const;

export const FilterSchema = z.object(
    Object.fromEntries(
        filterCategories.map((field) => [field, filterArraySchema])
    )
);

export type FilterFormType = z.infer<typeof FilterSchema>;
