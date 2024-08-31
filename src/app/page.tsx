import { ProductGrid } from '@/components/ProductGrid';
import { Filters } from '@/components/Filters';
import Header from '@/components/header/Header';
import HeroSection from '@/components/heroSection/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen flex-col items-center justify-between gap-6 p-6 md:gap-12 md:p-12'>
        <HeroSection
          title='Mobile Phones & Accessories'
          description='Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.'
        />
        <section className='w-full md:grid md:grid-cols-[1fr_4fr]'>
          <Filters />
          <ProductGrid />
        </section>
      </main>
    </>
  );
}
