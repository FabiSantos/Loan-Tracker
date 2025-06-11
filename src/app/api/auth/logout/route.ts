import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    return NextResponse.json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
} 