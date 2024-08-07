import { ProductGrid } from 'src/components/ProductGrid';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>Home</h1>
        <ProductGrid />
      </div>
    </main>
  );
}
