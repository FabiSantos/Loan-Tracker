'use client';
import { Button } from '@/app/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  return (
    <div className='flex justify-start items-center p-4'>
      <Button
        onClick={() => router.back()}
        className={`${usePathname() === '/' ? 'hidden' : 'block'}`}
      >
        <ArrowLeftIcon className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default BackButton;
