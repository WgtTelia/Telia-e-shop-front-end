import smallBannerImage from 'public/banners/BreakpointSmall.png';
import mediumBannerImage from 'public/banners/BreakpointMedium.png';
import largeBannerImage from 'public/banners/BreakpointLarge.png';

export const bannerImages = [
  {
    src: smallBannerImage,
    alt: 'Banner for small screens',
    classes: 'block sm:hidden md:invisible',
    width: 375,
    height: 300,
  },
  {
    src: mediumBannerImage,
    alt: 'Banner for medium screens',
    classes: 'hidden sm:block md:hidden lg:invisible',
    width: 768,
    height: 350,
  },
  {
    src: largeBannerImage,
    alt: 'Banner for large screens',
    classes: 'hidden md:block',
    width: 1440,
    height: 400,
  },
];
