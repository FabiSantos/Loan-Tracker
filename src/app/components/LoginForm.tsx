'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';
import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useCapitalize } from '@/hooks/useCapitalize';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const { value: email, setCapitalizedValue: setEmail } = useCapitalize('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Error al iniciar sesión');
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico para iniciar sesión en su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <a
                    href='/forgot-password'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className='text-sm text-red-500'>{error}</div>}

              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              No tienes una cuenta?{' '}
              <a href='/register' className='underline underline-offset-4'>
                Registrarse
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
