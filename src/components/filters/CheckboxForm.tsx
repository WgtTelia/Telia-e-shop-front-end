import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxFormProps {
    form: any;
    name: string;
    title: string;
    options: string[];
    onChange: () => void;
}

export const CheckboxForm: React.FC<CheckboxFormProps> = ({
    form,
    name,
    title,
    options,
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-base font-medium text-gray-750'>
                        {title}
                    </FormLabel>
                    <div className='space-y-4 pt-2 text-gray-750'>
                        {options.map((option) => (
                            <div
                                key={option}
                                className='flex flex-row items-center space-x-2 align-middle text-base'
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(option)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([
                                                      ...field.value,
                                                      option,
                                                  ])
                                                : field.onChange(
                                                      field.value?.filter(
                                                          (value: string) =>
                                                              value !== option
                                                      )
                                                  );
                                        }}
                                    />
                                </FormControl>
                                <FormLabel className='font-light after:hover:cursor-pointer'>
                                    {option}
                                </FormLabel>
                            </div>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
