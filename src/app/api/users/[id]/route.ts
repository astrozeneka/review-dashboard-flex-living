import { AuthenticatedRequest, withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


/**
 * Fetches user information for the authenticated user.
 * Requires authentication.
 * @param request 
 * @returns JSON response containing the user data.
 */
export const GET = withAuth(async function handler(request: AuthenticatedRequest) {
    const userId = request.user!.id;
    // Validate the userId is provided
    if (!userId) {
        return NextResponse.json(
            { error: 'User ID is required' },
            { status: 422 }
        );
    }

    // Fetch user data from the database
    const userData = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: {
            id: true,
            name: true,
            email: true,
            // Add other fields as necessary
        }
    });

    return NextResponse.json(userData);
});