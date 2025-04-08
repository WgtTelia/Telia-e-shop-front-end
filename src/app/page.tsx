import { FilterButtonsContainer } from '@/components/filters/FilterButtonsContainer';
import { Filters } from '@/components/filters/Filters';
import { BannerImage } from '@/components/header/BannerImage';
import { Header } from '@/components/header/Header';
import { HeroSection } from '@/components/header/HeroSection';
import { PaginationGroup } from '@/components/pagination/PaginationGroup';
import { ResultsCount } from '@/components/pagination/ResultsCount';
import { ItemsPerPageSelector } from '@/components/pagination/ResultsPerPageSelector';
import { FilterAndSortProvider } from '@/context/FilterAndSortProvider';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Mobile Phones & Accessories | Telia',
    description:
        'Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.',
};

const DynamicProductGrid = dynamic(() =>
    import('@/components/product/ProductGrid').then((mod) => mod.ProductGrid)
);

export default function Home() {
    return (
        <>
            <Header />
            <BannerImage />
            <main className='m-auto flex min-h-screen w-full max-w-main-app flex-col items-center gap-y-10 p-main-content md:p-main-content-md xl:gap-y-12 xl:p-main-content-lg'>
                <HeroSection
                    title='Mobile Phones & Accessories'
                    description='Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.'
                />
                <section className='w-full'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilterAndSortProvider>
                            <FilterButtonsContainer />
                            <div className='w-full gap-8 xl:grid xl:grid-cols-main-app'>
                                <div className='hidden space-y-5 xl:block'>
                                    <Filters />
                                </div>
                                <div className='flex flex-col xl:overflow-y-auto xl:p-1'>
                                    <div className='flex w-full flex-row items-center justify-between gap-4'>
                                        <ResultsCount />
                                        <ItemsPerPageSelector />
                                    </div>
                                    <DynamicProductGrid />
                                    <PaginationGroup />
                                </div>
                            </div>
                        </FilterAndSortProvider>
                    </Suspense>
                </section>
            </main>
        </>
    );
}
