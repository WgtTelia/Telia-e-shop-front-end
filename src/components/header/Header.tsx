import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';
import smallBannerImage from '../../../public/banners/Breakpoint=Small.png';
import mediumBannerImage from '../../../public/banners/Breakpoint=Medium.png';
import largeBannerImage from '../../../public/banners/Breakpoint=Large.png';

export const bannerImages = [
  {
    src: smallBannerImage,
    alt: 'Banner for small screens',
    classes: 'block sm:hidden',
    width: 375,
    height: 300,
  },
  {
    src: mediumBannerImage,
    alt: 'Banner for medium screens',
    classes: 'hidden sm:block md:hidden',
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

const Header = () => {
  return (
    <header>
      <nav className='sticky top-0 z-10 mx-auto flex bg-white p-4 lg:ps-16'>
        <Link href='/'>
          <Image src={logo} alt='logo' />
        </Link>
      </nav>
      <div className='relative'>
        {bannerImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            className={`${image.classes} h-auto w-full`}
            width={image.width}
            height={image.height}
            priority
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
