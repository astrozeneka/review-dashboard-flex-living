import { listingService } from "@/app/services/ListingService";
import { NextResponse } from "next/server";


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const listing = await listingService.fetchListingById(id);

    if (!listing) {
        return NextResponse.json({
            status: 'error',
            message: 'Listing not found'
        }, { status: 404 });
    }

    return NextResponse.json({
        status: 'success',
        result: listing
    });
}