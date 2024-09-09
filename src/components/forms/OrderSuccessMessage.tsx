import { FaCircleCheck } from 'react-icons/fa6';

export const OrderSuccessMessage = () => {
  return (
    <div className='success-message border-success-medium border-2 p-4'>
      <div className='text-success-medium flex items-center gap-2'>
        <FaCircleCheck />
        <p className='font-medium text-success'>We&apos;ve received your order</p>
      </div>
      <p className='mt-3'>
        You&apos;ll receive a call in the next 24 hours and finalise your order with
        one of our agents.
      </p>
    </div>
  );
};
