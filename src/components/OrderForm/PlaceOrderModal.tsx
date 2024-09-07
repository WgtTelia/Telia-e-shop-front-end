'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { OrderNowBtn } from '@/components/OrderNowBtn';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

const FormSchema = z.object({
  nameAndSurname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export const PlaceOrderModal = () => {
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
      <DialogContent className='lg:flex'>
        <div className='hidden lg:block'>
          <img src='/form-image.png' alt='' />
        </div>
        <div>
          <DialogHeader>
            <DialogTitle className='text-3xl'>Finalise Your Order</DialogTitle>
            <DialogDescription>
              Please leave your contact details below. We'll contact you very
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
