import React from 'react';

interface BannerSectionProps {
  title: string;
  description: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
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

export default BannerSection;
