import { reviewService } from "@/app/services/ReviewService";
import { withAuth } from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const HOSTAWAY_API_BASE = process.env.HOSTAWAY_API_BASE;
const HOSTAWAY_API_KEY = process.env.HOSTAWAY_API_KEY;



// TODO: MOVE TO A SERVICE FILE (after the brainstorming + prototyping phase)
interface HostawayListing {
    id: number;
    name: string;
    address?: string;
    city?: string;
    country?: string;
    picture?: string;
    // Add other fields you need from Hostaway API
}

interface HostawayListingsResponse {
    status: string;
    result: HostawayListing[];
}

export const GET = async function handler(request: NextRequest) {
    try {
        // TODO Next, search and pagination
        // Validate environment variables
        if (!HOSTAWAY_API_BASE || !HOSTAWAY_API_KEY) {
            return NextResponse.json(
                { error: 'Missing Hostaway API configuration' },
                { status: 500 }
            );
        }

        // Sometimes a match query parameters is provided
        const { searchParams } = new URL(request.url);
        const params = new URLSearchParams();
        if (searchParams.get('match')) {
            params.append('match', searchParams.get('match') as string);
        }

        // Fetch listings from Hostaway API
        // Next.js will cache this by default for the duration specified in revalidate
        const response = await fetch(`${HOSTAWAY_API_BASE}/listings?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${HOSTAWAY_API_KEY}`,
                'Content-Type': 'application/json',
            },
            // Cache for 1 hour (3600 seconds)
            // Adjust this based on how often listings change
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Hostaway API error:', response.status, errorText);
            return NextResponse.json(
                { error: 'Failed to fetch listings from Hostaway', details: errorText },
                { status: response.status }
            );
        }

        const data: HostawayListingsResponse = await response.json();



        // Normalize/simplify the response if needed
        const listings = await Promise.all(data.result.map(async listing => ({
            id: listing.id,
            name: listing.name,
            address: listing.address,
            city: listing.city,
            country: listing.country,
            picture: listing.picture,
            averageRating: await reviewService.fetchAverageRatingByListingId(listing.id.toString()),
            reviewsCount: await reviewService.fetchReviewsCountByListingId(listing.id.toString(), false)
        })));

        return NextResponse.json({
            success: true,
            count: listings.length,
            listings,
        });
    } catch (error) {
        console.error('Unexpected error fetching listings:', error);
        return NextResponse.json(
            { error: 'Unexpected error fetching listings' },
            { status: 500 }
        );
    }

};