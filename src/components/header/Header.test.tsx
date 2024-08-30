import { render, screen } from '@testing-library/react';
import Header, { bannerImages } from './Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Header />);
    const logoImage = screen.getByRole('img', { name: 'logo' });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'logo');
  });
});
