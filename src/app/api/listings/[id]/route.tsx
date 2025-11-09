import { listingService } from "@/app/services/ListingService";
import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const listing = await listingService.fetchListingById(id);
    const stats = await reviewService.fetchReviewStatsByListingId(id);

    if (!listing) {
        return NextResponse.json({
            status: 'error',
            message: 'Listing not found'
        }, { status: 404 });
    }

    return NextResponse.json({
        status: 'success',
        result: listing,
        stats: stats
    });
}