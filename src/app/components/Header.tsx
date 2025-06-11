'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Button } from '@/app/components/ui/button';
import { Moon, Sun, LogOut, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='flex justify-between items-center h-16 bg-gray-100 dark:bg-gray-800 px-4'>
      <Link href='/dashboard'>
        <h1 className='text-4xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer'>
          LOAN TRACKER
        </h1>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <ModeToggle />
         {/*  <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Modo Oscuro</span>
              </>
            )}
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
