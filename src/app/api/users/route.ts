import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email, name, password } = await request.json()

    // Validate email unicity
    if (await prisma.user.findUnique({
        where: { email }
    })) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 422 })
    }

    // Validate password length
    if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 422 })
    }

    const user = await prisma.user.create({
        data: { email, name, password }
    })

    return NextResponse.json({ 
        user,
        message: 'Registration successful',
        // token,
        // refreshToken,
    }, { status: 201 })
}