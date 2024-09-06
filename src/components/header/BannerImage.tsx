import Image from 'next/image';
import { bannerImages } from 'public/banners/bannerImages';
import React from 'react';

const BannerImage = () => {
  return (
    <>
      {bannerImages.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          placeholder='blur'
          className={`${image.classes} h-auto w-full`}
          loading={image.loading}
          priority
        />
      ))}
    </>
  );
};

export default BannerImage;
