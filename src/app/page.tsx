import { LoginForm } from './components/login-form';
import { ModeToggle } from './components/modeToggle';

export default async function Home() {
  return (
    <>
      <div className='flex items-center pt-10 mt-10 justify-center h-full w-full'>
        <div className=''>
          <LoginForm />
        </div>
      </div>
      <div className='flex items-center justify-center pt-10 mt-10'>
        <ModeToggle />
      </div>
    </>
  );
}
