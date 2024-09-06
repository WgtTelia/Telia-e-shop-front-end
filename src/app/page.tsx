import { ProductGrid } from '@/components/ProductGrid';
import HeroSection from '@/components/header/HeroSection';
import Header from '@/components/header/Header';
import { Filters } from '@/components/Filters';
import FilterButtonsContainer from '@/components/filters/FilterButtonsContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Phones & Accessories | Telia',
  description:
    'Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen w-full flex-col items-center gap-y-10 p-main-content md:p-main-content-md lg:gap-y-12 lg:p-main-content-lg'>
        <HeroSection
          title='Mobile Phones & Accessories'
          description='Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.'
        />
        <section className='w-full'>
          <FilterButtonsContainer />
          <div className='w-full md:grid md:grid-cols-1 lg:grid-cols-[1fr_4fr]'>
            <Filters />
            <ProductGrid />
          </div>
        </section>
      </main>
    </>
  );
}
