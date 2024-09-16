import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';
import BannerImage from '@/components/header/BannerImage';

export const Header = () => {
  //Heder
  return (
    <header>
      <nav className='sticky top-0 z-10 mx-auto flex bg-white p-4 lg:ps-16'>
        <Link href='/'>
          <Image src={logo} alt='Company logo' loading='lazy' />
        </Link>
      </nav>
      <BannerImage />
    </header>
  );
};
