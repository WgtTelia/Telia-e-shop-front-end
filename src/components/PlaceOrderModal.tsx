'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { OrderNowBtn } from '@/components/OrderNowBtn';
import {
  Dialog,
  DialogClose,
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
      <DialogContent className='md:flex md:border-0 md:p-0'>
        <div
          className='hidden min-w-[200px] md:block'
          style={{
            backgroundImage: 'url("/form-decoration.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='md:p-6'>
          <DialogHeader>
            <DialogTitle className='text-3xl'>Finalise Your Order</DialogTitle>
            <DialogDescription>
              Please leave your contact details below. We&apos;ll contact you very
              shortly to finalise your order.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-[20px]'
            >
              <FormField
                control={form.control}
                name='nameAndSurname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Name and surname</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='mt-3'>
                Place order
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
