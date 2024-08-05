import Link from 'next/link';
import { TestButton } from 'src/components/TestButton';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>Home</h1>
        <Link href='/about'>About</Link>
        <div className='bg-white p-6'>
          <div className='bg-grey-100 outline-grey-200 rounded-md px-4 py-2 align-middle outline outline-2 mb-6'>
            <div className='align-center flex flex-row items-center justify-center gap-3'>
              <div className='outline-success-light outline-3 bg-success h-[8px] w-[8px] rounded-lg outline'></div>
              <p className='text-success'>In stock</p>
            </div>
          </div>
          <TestButton />
        </div>
      </div>
    </main>
  );
}
