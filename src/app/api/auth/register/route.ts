import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ message: 'Email y contraseña requeridos' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 })
  }

  const password_hash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password_hash }
  })

  return NextResponse.json({
    message: 'Usuario registrado exitosamente',
    user: { id: user.id, email: user.email }
  }, { status: 201 })
}
