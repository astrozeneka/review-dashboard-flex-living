import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";

/**
 * Fetches reviews for a specific listing by its ID.
 * @param req 
 * @param param1
 * @returns JSON response containing the reviews.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const reviews = await reviewService.fetchReviewsByListingId(id);

    return NextResponse.json({
        status: 'success',
        result: reviews
    });
}