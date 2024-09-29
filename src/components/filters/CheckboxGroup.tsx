import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxGroupProps {
    form: any;
    name: string;
    title: string;
    options: string[];
    onChange: () => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
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
                    <FormLabel>{title}</FormLabel>
                    <div className='space-y-2'>
                        {options.map((option) => (
                            <FormItem
                                key={option}
                                className='flex flex-row items-start space-x-3 space-y-0'
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
                                <FormLabel className='font-normal'>
                                    {option}
                                </FormLabel>
                            </FormItem>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
