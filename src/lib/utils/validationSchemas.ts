import { z } from 'zod';

const filterArraySchema = z.array(z.string()).optional();
export const filterCategories = [
    'types',
    'brands',
    'priceRanges',
    'colors',
    'stock',
] as const;

export const FilterSchema = z.object(
    Object.fromEntries(
        filterCategories.map((field) => [field, filterArraySchema])
    )
);

export type FilterFormType = z.infer<typeof FilterSchema>;
