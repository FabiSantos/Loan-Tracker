import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <Link href='/dashboard'>
      <div className='flex justify-center items-center h-16 bg-gray-100 cursor-pointer'>
        <h1 className='text-4xl font-bold text-blue-600'>LOAN TRACKER</h1>
      </div>
    </Link>
  );
};

export default Header;
