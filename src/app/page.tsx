import { TestButton } from '@/components/TestButton';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>Home</h1>
        <Link href='/about'>About</Link>
        <div className='bg-white p-6'>
          <div className='mb-6 rounded-md bg-grey-100 px-4 py-2 align-middle outline outline-2 outline-grey-200'>
            <div className='align-center flex flex-row items-center justify-center gap-3'>
              <div className='outline-3 h-[8px] w-[8px] rounded-lg bg-success outline outline-success-light'></div>
              <p className='text-success'>In stock</p>
            </div>
          </div>
          <TestButton />
        </div>
      </div>
    </main>
  );
}
