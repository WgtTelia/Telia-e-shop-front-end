import React from 'react';

export const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    description,
}) => {
    return (
        <section className='flex w-full flex-col gap-y-5'>
            <h1 className='text-hero-title font-bold md:text-hero-title-md lg:text-hero-title-lg'>
                {title}
            </h1>
            <p className='text-base lg:text-2xl'>{description}</p>
        </section>
    );
};
