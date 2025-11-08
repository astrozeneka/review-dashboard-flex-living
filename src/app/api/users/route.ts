import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, name } = await request.json()
  
  const user = await prisma.user.create({
    data: { email, name }
  })
  
  return NextResponse.json(user)
}