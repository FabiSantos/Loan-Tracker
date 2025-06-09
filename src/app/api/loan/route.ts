import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';


export async function GET() {
try {
  const loans = await prisma.loan.findMany();
  return NextResponse.json(loans);
} catch (error) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      item_name,
      description,
      quantity,
      borrowed_at,
      return_by,
      state_start,
      state_end,
      recipient_name,
    } = body;

    if (
      !item_name ||
      !recipient_name ||
      !quantity ||
      !borrowed_at ||
      !return_by ||
      !state_start
    ) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Get first user from database
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: 'No hay usuarios en el sistema' }, { status: 400 });
    }

    const newLoan = await prisma.loan.create({
      data: {
        item_name,
        description: description ?? null,
        recipient_name,
        quantity,
        borrowed_at: new Date(borrowed_at),
        return_by: new Date(return_by),
        state_start,
        state_end: state_end ?? null,
        user_id: user.id
      },
    });

    return NextResponse.json(newLoan);
  } catch (error) {
    console.error('Error al crear el préstamo:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
