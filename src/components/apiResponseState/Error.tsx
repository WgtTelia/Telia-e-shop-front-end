import React from 'react';
import { FaArrowRotateRight, FaTriangleExclamation } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
interface ErrorProps {
    children: React.ReactNode;
}
export const Error: React.FC<ErrorProps> = ({ children }) => {
    const handleReload = () => {
        window.location.reload();
    };
    return (
        <div className='flex w-full flex-col items-center gap-2 p-2 text-xl font-medium text-error-strong'>
            <FaTriangleExclamation />
            {children}
            <Button
                variant='outline'
                onClick={handleReload}
                icon={<FaArrowRotateRight />}
                iconPosition='left'
            >
                Try again
            </Button>
        </div>
    );
};
