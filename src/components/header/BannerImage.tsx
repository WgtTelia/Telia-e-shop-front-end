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
          placeholder='empty'
          className={`${image.classes} h-auto w-full`}
          width={image.width}
          height={image.height}
          priority
        />
      ))}
    </>
  );
};

export default BannerImage;
