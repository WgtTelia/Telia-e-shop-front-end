import { render, screen } from '@testing-library/react';
import Header from './Header';
import { resizeWindow } from '@/lib/utils';
import { bannerImages } from 'public/banners/bannerImages';

jest.mock('next/image', () => jest.requireActual('next/image'));

describe('Header component', () => {
  const checkBannerImage = (
    width: number,
    altText: string,
    className: string
  ) => {
    resizeWindow(width);
    const bannerImage = screen.getByAltText(altText);
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveClass(className);
  };

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

  it('ensures all banner images are rendered with correct attributes', () => {
    render(<Header />);
    bannerImages.forEach((image) => {
      const imgElement = screen.getByAltText(image.alt);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveClass(image.classes);
      expect(imgElement).toHaveAttribute('width', image.width.toString());
      expect(imgElement).toHaveAttribute('height', image.height.toString());
    });
  });

  it('renders the correct banner image based on screen size', async () => {
    expect.assertions(6);
    render(<Header />);
    checkBannerImage(375, 'Banner for small screens', 'block sm:hidden');
    checkBannerImage(
      768,
      'Banner for medium screens',
      'hidden sm:block md:hidden'
    );
    checkBannerImage(1440, 'Banner for large screens', 'hidden md:block');
  });
});
