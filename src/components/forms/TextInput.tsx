import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { FaTriangleExclamation } from 'react-icons/fa6';

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export const TextInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  error,
}: TextInputProps<T>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...register(name)} />
      </FormControl>
      {error && (
          <FormMessage className='text-danger-medium'>
            <FaTriangleExclamation className="inline align-middle mb-1 mr-1"/>
            {error}
          </FormMessage>
      )}
    </FormItem>
  );
};
