import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

export const TestButton = () => {
  return (
    <button className='flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white'>
      Order now
      <FaArrowRight />
    </button>
  );
};
