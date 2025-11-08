import { comparePassword, generateToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validate a valid email and password
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Authenticate the user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                // Additional data to include if necessary
            }
        });
        if (!user || !(await comparePassword(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate auth tokens
        const token = generateToken({
            userId: user.id.toString(),
            email: user.email
        });
        // const refreshToken = await createRefreshToken(user.id.toString(), 'web-app');

        return NextResponse.json({
            message: 'Login successful',
            token,
            // refreshToken,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email
            }
            // Additional data to return if necessary
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }


}