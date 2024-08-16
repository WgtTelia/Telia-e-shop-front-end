import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Button } from './ui/button';

interface OrderNowBtnProps {
  onClick: () => void;
}

export const OrderNowBtn: React.FC<OrderNowBtnProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      Order now
      <FaArrowRight />
    </Button>
  );
};
