import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { resizeWindow } from '@/lib/utils';
import { HeroSection } from '@/components/header/HeroSection';

describe('BannerSection component', () => {
    it('renders the title and description correctly', () => {
        const testTitle = 'Test Title';
        const testDescription = 'Test Description...';

        render(<HeroSection title={testTitle} description={testDescription} />);

        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveTextContent(testTitle);
        expect(titleElement).toHaveClass('font-bold');
        expect(titleElement).toHaveClass('text-hero-title');

        const descriptionElement = screen.getByText(testDescription);
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveClass('text-base');
    });

    it('applies correct styles on medium screens', async () => {
        render(
            <HeroSection title='Test Title' description='Test Description' />
        );

        await act(async () => {
            resizeWindow(769);
        });

        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveClass(/md:text-hero-title-md/);
    });

    it('applies correct styles on large screens', async () => {
        render(
            <HeroSection title='Test Title' description='Test Description' />
        );

        await act(async () => {
            resizeWindow(1024);
        });

        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveClass(/xl:text-hero-title-lg/);
    });
});
