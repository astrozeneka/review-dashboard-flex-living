import { listingService } from "@/app/services/ListingService";
import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";

/**
 * Fetches detailed information about a specific listing by its ID,
 * @param request 
 * @param param1 
 * @returns JSON response containing the listing details, review stats, and recurring issues.
 */
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const listing = await listingService.fetchListingById(id);
    const stats = await reviewService.fetchReviewStatsByListingId(id);
    const recurringIssue = await reviewService.fetchRecurringIssueByListingId(id);


    if (!listing) {
        return NextResponse.json({
            status: 'error',
            message: 'Listing not found'
        }, { status: 404 });
    }

    return NextResponse.json({
        status: 'success',
        result: listing,
        stats: stats,
        recurringIssue: recurringIssue
    });
}