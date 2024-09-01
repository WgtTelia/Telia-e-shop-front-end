import { ProductGrid } from '@/components/ProductGrid';
import { Filters } from '@/components/Filters';
import Header from '@/components/header/Header';
import HeroSection from '@/components/heroSection/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className='p-main-content md:p-main-content-md lg:p-main-content-lg flex min-h-screen w-full flex-col items-center gap-y-10 lg:gap-y-12'>
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
