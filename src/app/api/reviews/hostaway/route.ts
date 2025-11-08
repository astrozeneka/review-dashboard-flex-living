import { Review } from "@/app/types/review";
import { reviewService } from "@/app/services/ReviewService";
import { AuthenticatedRequest, withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = withAuth(async function handler(request: AuthenticatedRequest) {

    // Return all reviews if no query params are provided
    const reviews: Review[] = await reviewService.fetchReviews();
    return NextResponse.json({
        status: 'success',
        result: reviews
    });
});