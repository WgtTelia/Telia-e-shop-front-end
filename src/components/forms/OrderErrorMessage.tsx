import { FaTriangleExclamation } from 'react-icons/fa6';

export const OrderErrorMessage = () => {
    return (
        <div className='rounded-lg border-2 border-l-4 border-error-medium p-4'>
            <div className='flex items-center gap-2 text-error-medium'>
                <FaTriangleExclamation data-testid='triangle-icon' />
                <p className='font-medium text-error-strong'>
                    Your order hasn&apos;t been placed
                </p>
            </div>
            <p className='mt-3'>
                There&apos;s been a technical error. Unfortunately, we
                haven&apos;t received your order. Close this window and try
                placing your order again.
            </p>
        </div>
    );
};
