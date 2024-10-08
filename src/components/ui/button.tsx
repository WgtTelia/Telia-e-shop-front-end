import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-normal ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-white hover:bg-primary-light focus-visible:ring-primary-light focus-visible:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
                destructive:
                    'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
                outline:
                    'border border-primary-dark bg-white hover:bg-primary-active hover:text-primary-dark focus-visible:ring-primary-light focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
                secondary:
                    'bg-primary-dark text-white hover:bg-primary focus-visible:ring-primary-light focus-visible:ring-offset-2 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
                ghost: 'hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
                link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
                filter: 'w-full min-w-fit flex-1 border border-primary-light px-5 text-primary-light hover:border-primary-dark hover:bg-primary-active hover:text-primary-dark active:border-primary-dark active:bg-primary-active active:text-primary-dark xs:w-auto md:max-w-fit',
                close: 'border border-primary-dark text-primary-dark hover:bg-primary-active',
                results: 'bg-primary-dark text-white hover:bg-primary',
                done: 'absolute right-3 top-2.5 text-white underline-offset-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
                action: 'bg-transparent text-white opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-0 focus-visible:ring-offset-0',
            },
            size: {
                default: 'h-10 px-6 py-4',
                xs: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'size-10',
                picker: 'h-7',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            icon,
            iconPosition,
            asChild = false,
            children,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {icon && iconPosition === 'left' && (
                    <span className='mr-2'>{icon}</span>
                )}
                {children}
                {icon && iconPosition === 'right' && (
                    <span className='ml-2'>{icon}</span>
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
