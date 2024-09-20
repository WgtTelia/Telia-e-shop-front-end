'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlaceOrderForm } from '@/components/forms/PlaceOrderForm';
import { FaArrowRight } from 'react-icons/fa6';

interface PlaceOrderModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  brandName: string;
  modelName: string;
  selectedColor: ColorOption;
}

export const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  isOpen,
  setIsOpen,
  brandName,
  modelName,
  selectedColor,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          icon={<FaArrowRight />}
          iconPosition='right'
          disabled={selectedColor.stockAmount === 0}
        >
          Order now
        </Button>
      </DialogTrigger>
      <DialogContent className='md:w-9/10 h-full w-full max-w-full rounded-none sm:rounded-none md:flex md:max-h-dialog-content md:max-w-dialog-content md:gap-0 md:rounded-md md:border-0 md:p-0'>
        <div className='relative hidden md:block md:w-image-container'>
          <Image
            src='/form-decoration.png'
            alt='Form decoration'
            fill
            sizes='(min-width: 768px) 33vw, 100vw'
          />
        </div>
        <div className='md:p-6 md:px-12'>
          <DialogHeader>
            <DialogTitle className='mt-2 text-modal-title'>
              Finalise Your Order
            </DialogTitle>
            <DialogDescription className='sr-only' role='label'>
              Please fill in the form below to complete your order.
            </DialogDescription>
          </DialogHeader>
          <PlaceOrderForm
            onClose={() => setIsOpen(false)}
            brandName={brandName}
            modelName={modelName}
            selectedColor={selectedColor}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
