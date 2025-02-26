import { Search } from 'lucide-react';

interface NoResultsProps {
    message: string;
    suggestion?: string;
}

export const NoResults: React.FC<NoResultsProps> = ({
    message,
    suggestion,
}) => {
    return (
        <div className='flex flex-col items-center justify-center p-8 text-center'>
            <Search className='mb-4 size-12 text-gray-400' />
            <p className='mb-2 text-lg font-semibold'>{message}</p>
            <p className='text-sm text-gray-600'>{suggestion}</p>
        </div>
    );
};
