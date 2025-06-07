import Link from 'next/link';
import { LoginForm } from './components/login-form';
import { ModeToggle } from './components/modeToggle';

export default async function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl font-bold text-blue-600'>LOAN TRACKER</h1>
      <ModeToggle />
      <div className='flex flex-col gap-4'>
        <Link href='/login'>Login</Link>
        <Link href='/new-tracker'>New Tracker</Link>
        <Link href='/dashboard'>Dashboard</Link>
        <LoginForm />
      </div>
    </div>
  );
}
