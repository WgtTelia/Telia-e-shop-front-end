import React from 'react'
import { getImageProps, ImageProps, StaticImageData } from 'next/image'
import { bannerImages } from 'public/banners/bannerImages'
import smallBannerImage from 'public/banners/BreakpointSmall.webp'

interface BannerImageData {
  media: string
  src: StaticImageData
  width: number
  height: number
  quality: number
  dataTestId: string
}

export const BannerImage: React.FC = () => {
  const commonProps: Pick<ImageProps, 'alt' | 'sizes'> = {
    alt: 'Banner Image',
    sizes: '100vw',
  }

  const sources = bannerImages.map(
    ({ media, src, width, height, quality, dataTestId }: BannerImageData) => {
      const {
        props: { srcSet },
      } = getImageProps({
        ...commonProps,
        width,
        height,
        quality,
        src,
      })

      return (
        <source
          key={media}
          media={media}
          srcSet={srcSet}
          data-testid={dataTestId}
        />
      )
    }
  )

  const {
    props: { srcSet: mobileSrcSet, ...restProps },
  } = getImageProps({
    ...commonProps,
    width: 375,
    height: 300,
    quality: 60,
    src: smallBannerImage,
  })

  return (
    <picture>
      {sources}
      <source media='(min-width: 375px)' srcSet={mobileSrcSet} />
      <img
        {...restProps}
        style={{ width: '100%', height: 'auto' }}
        alt='Fallback banner image'
        loading='eager'
      />
    </picture>
  )
}

export default BannerImage
