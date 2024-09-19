import { FaTriangleExclamation } from 'react-icons/fa6';

export const OrderErrorMessage = () => {
  return (
    <div
      className='border-error-medium rounded-lg border-2 p-4'
      style={{ borderLeftWidth: '6px' }}
    >
      <div className='text-error-medium flex items-center gap-2'>
        <FaTriangleExclamation />
        <p className='text-error-strong font-medium'>
          Your order hasn&apos;t been placed
        </p>
      </div>
      <p className='mt-3'>
        There&apos;s been a technical error. Unfortunately, we haven&apos;t received your
        order. Close this window and try placing your order again.
      </p>
    </div>
  );
};
