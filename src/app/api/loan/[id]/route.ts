import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';


interface Params {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, {params}: Params ) {

try {
    const loan = await prisma.loan.findFirst({ where: { id: params.id } });
    return NextResponse.json(loan);
} catch (error) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}
}

export async function DELETE(request: NextRequest, {params}: Params ) {
  try {
    const deleteLoan = await prisma.loan.delete({ where: { id: params.id } });
    return NextResponse.json(deleteLoan);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: NextRequest, {params}: Params ) {
try {
  const { item_name, description, quantity, borrowed_at, return_by, state_start, state_end, recipient_name, user_id } = await request.json();
  const updateLoan = await prisma.loan.update({ where: { id: params.id }, data: { item_name, description, quantity, borrowed_at, return_by, state_start, state_end, recipient_name, user_id } });
  return NextResponse.json(updateLoan);
} catch (error) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });  
}
}
}