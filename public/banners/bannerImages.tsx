import smallBannerImage from 'public/banners/BreakpointSmall.png';
import mediumBannerImage from 'public/banners/BreakpointMedium.png';
import largeBannerImage from 'public/banners/BreakpointLarge.png';
import { StaticImageData } from 'next/image';

interface BannerImageType {
  src: StaticImageData;
  alt: string;
  classes: string;
  width: number;
  height: number;
  priority: boolean;
  loading: 'lazy' | 'eager' | undefined;
  srcSet?: string;
}

export const bannerImages: BannerImageType[] = [
  {
    src: smallBannerImage,
    alt: 'Banner for small screens',
    classes: 'block sm:hidden md:invisible',
    width: 375,
    height: 300,
    priority: true,
    loading: 'eager',
  },
  {
    src: mediumBannerImage,
    alt: 'Banner for medium screens',
    classes: 'hidden sm:block md:hidden lg:invisible',
    width: 768,
    height: 350,
    priority: true,
    loading: 'eager',
  },
  {
    src: largeBannerImage,
    alt: 'Banner for large screens',
    classes: 'hidden md:block',
    width: 1440,
    height: 400,
    priority: true,
    loading: 'eager',
  },
];
