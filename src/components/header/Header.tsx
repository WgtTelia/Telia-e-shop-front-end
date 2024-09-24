import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.svg';

export const Header = () => {
    return (
        <header className='sticky top-0 z-10'>
            <nav className='mx-auto flex bg-white/60 p-4 backdrop-blur-md backdrop-hue-rotate-15 lg:ps-16'>
                <Link href='/'>
                    <Image src={logo} alt='Company logo' loading='lazy' />
                </Link>
            </nav>
        </header>
    );
};
