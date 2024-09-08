import React from 'react';
import { getImageProps } from 'next/image';
import smallBannerImage from 'public/banners/BreakpointSmall.webp';
import mediumBannerImage from 'public/banners/BreakpointMedium.webp';
import largeBannerImage from 'public/banners/BreakpointLarge.webp';

export const BannerImage = () => {
  const common = { alt: 'Banner Image', sizes: '100vw' };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 400,
    quality: 80,
    src: largeBannerImage,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 768,
    height: 350,
    quality: 70,
    src: mediumBannerImage,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 375,
    height: 300,
    quality: 60,
    src: smallBannerImage,
  });

  return (
    <picture>
      <source
        media='(min-width: 1440px)'
        srcSet={desktop}
        data-testid='desktop'
      />
      <source media='(min-width: 768px)' srcSet={tablet} data-testid='tablet' />
      <source media='(min-width: 375px)' srcSet={mobile} data-testid='mobile' />
      <img
        {...rest}
        style={{ width: '100%', height: 'auto' }}
        alt='Fallback banner image'
        loading='eager'
      />
    </picture>
  );
};

export default BannerImage;
