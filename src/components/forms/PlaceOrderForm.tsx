import React from 'react';
import { Button } from '@/components/ui/button';
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
import { nameRegex, phoneRegex } from '@/lib/formRegex';

const FormSchema = z.object({
  nameAndSurname: z.string().refine((value) => nameRegex.test(value), {
    message:
      'Name and surname must contain at least 2 characters followed by a space and at least another 2 characters',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().refine((value) => phoneRegex.test(value), {
    message: 'Invalid phone number',
  }),
});

export const PlaceOrderForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-4 flex flex-col gap-[20px]'
      >
        <FormField
          control={form.control}
          name='nameAndSurname'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? 'text-danger' : ''}>
                * Name and surname
              </FormLabel>
              <FormControl>
                <Input {...field} className='text-grey-400' />
              </FormControl>
              <FormMessage className='text-danger' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? 'text-danger' : ''}>
                * Email address
              </FormLabel>
              <FormControl>
                <Input {...field} className='text-grey-400' />
              </FormControl>
              <FormMessage className='text-danger' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? 'text-danger' : ''}>
                * Phone number
              </FormLabel>
              <FormControl>
                <Input {...field} className='text-grey-400' />
              </FormControl>
              <FormMessage className='text-danger' />
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
  );
};
