'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { OrderNowBtn } from '@/components/OrderNowBtn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface PlaceOrderModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSchema = z.object({
  nameAndSurname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export const PlaceOrderModal: React.FC<PlaceOrderModalProps> = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-4 flex flex-col gap-[20px]'
            >
              <FormField
                control={form.control}
                name='nameAndSurname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Name and surname</FormLabel>
                    <FormControl>
                      <Input {...field} className='text-grey-400' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Email address</FormLabel>
                    <FormControl>
                      <Input {...field} className='text-grey-400' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} className='text-grey-400' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='bg-primary-dark mt-3 max-w-[156px] md:mt-7'
              >
                Place order
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
