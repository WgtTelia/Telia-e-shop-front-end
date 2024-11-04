import { Skeleton } from '@/components/ui/skeleton';

interface CheckboxGroupSkeletonProps {
    rows: number;
    cols: number;
}

export const CheckboxGroupSkeleton = ({
    rows,
    cols,
}: CheckboxGroupSkeletonProps) => (
    <div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className='py-4'>
                {Array.from({ length: cols }).map((_, colIndex) => (
                    <div key={colIndex} className='flex space-x-2 py-3'>
                        <Skeleton className='size-5' />
                        <Skeleton className='h-5 w-40' />
                    </div>
                ))}
            </div>
        ))}
    </div>
);
