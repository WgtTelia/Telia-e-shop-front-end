import Link from 'next/link';
import { TestButton } from 'src/components/TestButton';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>Home</h1>
        <Link href='/about'>About</Link>
        <div className="flex align-middle justify-center rounded-md px-4 py-2 bg-slate-700">
          <p className="text-2xl">My first <span className="text-blue-400">test styles</span></p>
        </div>
        <TestButton />
      </div>
    </main>
  );
}
