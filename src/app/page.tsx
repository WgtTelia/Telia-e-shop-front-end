import { ProductGrid } from '@/components/ProductGrid';
import { Filters } from '@/components/Filters';
import HeroSection from '@/components/header/HeroSection';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { LuArrowDownUp } from 'react-icons/lu';

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex min-h-screen w-full flex-col items-center gap-y-10 p-main-content md:p-main-content-md lg:gap-y-12 lg:p-main-content-lg'>
        <HeroSection
          title='Mobile Phones & Accessories'
          description='Discover the latest mobile phones and accessories to enhance your digital lifestyle. From sleek designs to powerful features, our selection offers something for everyone.'
        />
        <section className='w-full md:grid md:grid-cols-[1fr_4fr]'>
          <div>
            <Button
              variant='filter'
              icon={<PiSlidersHorizontalBold />}
              iconPosition='left'
            >
              Filter by
            </Button>
            <Button
              variant='filter'
              icon={<LuArrowDownUp />}
              iconPosition='left'
            >
              Most popular
            </Button>
            {/* <Button variant='close'>Close</Button>
          <Button variant='results'>
            See Results (12)
          </Button> */}
          </div>
          <Filters />
          <ProductGrid />
        </section>
      </main>
    </>
  );
}
