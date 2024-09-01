import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <section className='flex w-full flex-col gap-y-5'>
      <h1 className='text-hero-title md:text-hero-title-md lg:text-hero-title-lg font-bold'>
        {title}
      </h1>
      <p className='text-base lg:text-2xl'>{description}</p>
    </section>
  );
};

export default HeroSection;
