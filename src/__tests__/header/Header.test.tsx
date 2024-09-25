import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header/Header';
import { resizeWindow } from '@/lib/utils';
import { BannerImage } from '@/components/header/BannerImage';

describe('Header component', () => {
    it('renders the logo', () => {
        render(<Header />);
        const logoImage = screen.getByRole('img', { name: 'Company logo' });
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('alt', 'Company logo');
    });

    it('renders the navigation element', () => {
        render(<Header />);
        const navElement = screen.getByRole('navigation');
        expect(navElement).toBeInTheDocument();
    });

    it('renders the correct banner image for desktop devices', () => {
        resizeWindow(1440);
        render(<BannerImage />);

        const desktopSource = screen.getByTestId('desktop');
        expect(desktopSource).toBeInTheDocument();
        expect(desktopSource).toHaveAttribute('media', '(min-width: 1440px)');
    });

    it('renders the correct banner image for tablet devices', () => {
        resizeWindow(768);
        render(<BannerImage />);

        const tabletSource = screen.getByTestId('tablet');
        expect(tabletSource).toBeInTheDocument();
        expect(tabletSource).toHaveAttribute('media', '(min-width: 768px)');
    });

    it('renders the correct banner image for mobile devices', () => {
        resizeWindow(375);
        render(<BannerImage />);

        const mobileSource = screen.getByTestId('mobile');
        expect(mobileSource).toBeInTheDocument();
        expect(mobileSource).toHaveAttribute('media', '(min-width: 375px)');
    });
});
