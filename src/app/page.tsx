import Link from 'next/link';
import { LoginForm } from './components/login-form';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl font-bold text-blue-600'>LOAN TRACKER</h1>

      <div className='flex flex-col gap-4'>
        {/*     <Link href='/login'>Login</Link> */}
        <LoginForm />
      </div>
    </div>
  );
}
