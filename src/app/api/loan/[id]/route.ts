import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

// GET: Obtener préstamo por ID

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_req: NextRequest, context: any) {
  const id = context.params.id
  try {
    const loan = await prisma.loan.findFirst({
      where: { id },
    })
    return NextResponse.json(loan)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE: Eliminar préstamo por ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_req: NextRequest, context: any) {
  const id = context.params.id
  try {
    const deleted = await prisma.loan.delete({
      where: { id },
    })
    return NextResponse.json(deleted)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT: Actualizar préstamo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: any) {
  const id = context.params.id
  try {
    const {
      item_name,
      description,
      quantity,
      borrowed_at,
      return_by,
      state_start,
      state_end,
      recipient_name,
      user_id,
    } = await req.json()

    const updated = await prisma.loan.update({
      where: { id },
      data: {
        item_name,
        description,
        quantity,
        borrowed_at: new Date(borrowed_at),
        return_by: new Date(return_by),
        state_start,
        state_end,
        recipient_name,
        user_id,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
