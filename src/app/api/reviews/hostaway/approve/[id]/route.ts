import { reviewService } from "@/app/services/ReviewService";
import { AuthenticatedRequest, withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Approves a review by its ID.
 * Requires authentication.
 * @param request 
 * @param param1 
 * @returns JSON response indicating the approval result.
 */
export const POST = withAuth(async function handler(request: AuthenticatedRequest, { params }: { params: { id: string } }) {
    
    const reviewId = parseInt(params.id, 10);
    // Check if review exists
    const review = await reviewService.fetchReviewById(params.id);
    if (!review) {
        return NextResponse.json({ status: 'error', message: 'Review not found' }, { status: 404 });
    }

    const updatedReview = await reviewService.approveReview(params.id);
    if (!updatedReview) {
        return NextResponse.json({ status: 'error', message: 'Failed to approve review' }, { status: 500 });
    }

    // The updated listing stats
    const updatedListingStats = await reviewService.fetchReviewStatsByListingId(updatedReview.listingId.toString());

    return NextResponse.json({ 
        status: 'success', 
        message: 'Review approved successfully',
        result: updatedReview,
        listingStats: updatedListingStats
    }, { status: 200 });
})