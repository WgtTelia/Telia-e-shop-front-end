import smallBannerImage from 'public/banners/BreakpointSmall.webp'
import mediumBannerImage from 'public/banners/BreakpointMedium.webp'
import largeBannerImage from 'public/banners/BreakpointLarge.webp'

export const bannerImages = [
  {
    media: '(min-width: 1440px)',
    src: largeBannerImage,
    width: 1440,
    height: 400,
    quality: 80,
    dataTestId: 'desktop',
  },
  {
    media: '(min-width: 768px)',
    src: mediumBannerImage,
    width: 768,
    height: 350,
    quality: 70,
    dataTestId: 'tablet',
  },
  {
    media: '(min-width: 375px)',
    src: smallBannerImage,
    width: 375,
    height: 300,
    quality: 60,
    dataTestId: 'mobile',
  },
]
