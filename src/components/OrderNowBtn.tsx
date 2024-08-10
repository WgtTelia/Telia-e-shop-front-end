import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

interface OrderNowBtnProps {
  onClick: () => void;
}



export const OrderNowBtn: React.FC<OrderNowBtnProps> = ({onClick}) => {
  return (
    <button
      className='flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white hover:bg-primary-light'
      onClick={onClick}
    >
      Order now
      <FaArrowRight />
    </button>
  );
};
