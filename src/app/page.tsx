import { ProductGrid } from '@/components/ProductGrid';
import { Filters } from '@/components/Filters';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between gap-6 p-6 md:gap-12 md:p-12'>
      <header className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          Mobile Phones & Accessories
        </h1>
        <p className='text-base md:text-2xl'>
          Discover the latest mobile phones and accessories to enhance your
          digital lifestyle. From sleek designs to powerful features, our
          selection offers something for everyone.
        </p>
        <div>
          <Button variant='outline'>Test</Button>
        </div>
      </header>
      <div className='w-full md:grid md:grid-cols-[1fr_4fr]'>
        <Filters />
        <ProductGrid />
      </div>
    </main>
  );
}
