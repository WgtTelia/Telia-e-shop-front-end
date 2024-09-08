import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';
import Head from 'next/head';
import BannerImage from '@/components/header/BannerImage';

export const Header = () => {
  return (
    <header>
      <Head>
        <link rel='preload' href='/banners/BreakpointSmall.webp' as='image' />
        <link rel='preload' href='/banners/BreakpointMedium.webp' as='image' />
        <link rel='preload' href='/banners/BreakpointLarge.webp' as='image' />
      </Head>
      <nav className='sticky top-0 z-10 mx-auto flex bg-white p-4 lg:ps-16'>
        <Link href='/'>
          <Image src={logo} alt='Company logo' loading='lazy' />
        </Link>
      </nav>
      <BannerImage />
    </header>
  );
};
