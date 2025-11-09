import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { hashPassword, generateToken } from "@/lib/auth";

/**
 * Handles user registration requests.
 * Expects a JSON body with 'email', 'name', and 'password'.
 * Validates input, creates a new user, and returns an auth token on success.
 * @param request 
 * @returns JSON response containing the new user data and auth token.
 */
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

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: { email, name, password: hashedPassword }
    })

    // Generate auth tokens
    const token = generateToken({
        userId: user.id.toString(),
        email: user.email
    });

    // const refreshToken = await createRefreshToken(user.id.toString(), 'web-app');
    
    return NextResponse.json({
        user,
        message: 'Registration successful',
        token,
        // refreshToken,
    }, { status: 201 })
}