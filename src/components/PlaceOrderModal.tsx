'use client';

import React from 'react';
import { OrderNowBtn } from '@/components/OrderNowBtn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceOrderForm } from '@/components/forms/PlaceOrderForm';

interface PlaceOrderModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlaceOrderModal: React.FC<PlaceOrderModalProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <OrderNowBtn />
      </DialogTrigger>
      <DialogContent className='order-modal h-full w-full md:flex md:gap-0 md:border-0 md:p-0'>
        <div
          className='hidden min-w-[300px] md:block'
          style={{
            backgroundImage: 'url("/form-decoration.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='md:p-6 md:px-12'>
          <DialogHeader>
            <DialogTitle className='order-modal-title'>
              Finalise Your Order
            </DialogTitle>
            <DialogDescription className='order-modal-description'>
              Please leave your contact details below. We&apos;ll contact you
              very shortly to finalise your order.
            </DialogDescription>
          </DialogHeader>
          <PlaceOrderForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
