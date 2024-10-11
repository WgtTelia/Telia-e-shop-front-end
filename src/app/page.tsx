import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/apiResponseState/Loader';
import { Filters } from '@/components/filters/Filters';
import { FilterButtonsContainer } from '@/components/filters/FilterButtonsContainer';
import { FilterAndSortProvider } from '@/context/FilterAndSortProvider';
import { BannerImage } from '@/components/header/BannerImage';
import { HeroSection } from '@/components/header/HeroSection';
import { Header } from '@/components/header/Header';

export const metadata: Metadata = {
    title: 'Mobile Phones & Accessories | Telia',
    description:
        'Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.',
};

const DynamicProductGrid = dynamic(
    () =>
        import('@/components/product/ProductGrid').then(
            (mod) => mod.ProductGrid
        ),
    {
        loading: () => <Loader />,
        ssr: false,
    }
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
                    <FilterAndSortProvider>
                        <FilterButtonsContainer />
                        <div className='w-full gap-8 xl:grid xl:grid-cols-main-app'>
                            <div className='hidden space-y-5 xl:block'>
                                <Filters />
                            </div>
                            <div className='xl:overflow-y-auto xl:p-1'>
                                {/*To prevent the ProductGrid from being affected by the Filters components height changes */}
                                <DynamicProductGrid />
                            </div>
                        </div>
                    </FilterAndSortProvider>
                </section>
            </main>
        </>
    );
}
