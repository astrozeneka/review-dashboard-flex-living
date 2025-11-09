import { Review } from "@/app/types/review";
import { reviewService } from "@/app/services/ReviewService";
import { AuthenticatedRequest, withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = withAuth(async function handler(request: AuthenticatedRequest) {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    // Return all reviews if no query params are provided
    const reviews: Review[] = await reviewService.fetchReviews(offset, limit);
    return NextResponse.json({
        status: 'success',
        result: reviews
    });
});