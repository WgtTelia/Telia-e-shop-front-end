/* eslint-disable no-console */
// to prevent failed build due to console.log
// TODO: remove the console log once the backend is ready to accept data

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/forms/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { nameRegex, phoneRegex } from '@/lib/formRegex';
import { OrderSuccessMessage } from '@/components/forms/OrderSuccessMessage';

interface PlaceOrderFormProps {
  onClose: () => void;
  brandName: string;
  modelName: string;
  selectedColor: ColorOption;
}

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

export const PlaceOrderForm: React.FC<PlaceOrderFormProps> = ({
  onClose,
  brandName,
  modelName,
  selectedColor,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log({ brandName, modelName, selectedColor, ...data });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className='mt-4'>
        <OrderSuccessMessage />
        <Button variant='secondary' className='mt-12' onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className='mt-8'>
        Please leave your contact details below. We&apos;ll contact you very
        shortly to finalise your order.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-4 flex flex-col gap-[20px]'
        >
          <TextInput
            label='* Name and surname'
            name='nameAndSurname'
            placeholder='John Smith'
            register={form.register}
            error={form.formState.errors.nameAndSurname?.message}
          />
          <TextInput
            label='* Email'
            name='email'
            placeholder='john.smith@gmail.com'
            register={form.register}
            error={form.formState.errors.email?.message}
          />
          <TextInput
            label='* Phone number'
            name='phoneNumber'
            placeholder='+37064588162'
            register={form.register}
            error={form.formState.errors.phoneNumber?.message}
          />
          <Button
            type='submit'
            variant='secondary'
            className='mt-3 max-w-[156px] md:mt-7'
          >
            Place order
          </Button>
        </form>
      </Form>
    </>
  );
};
