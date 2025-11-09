import { GoogleReview } from "@/app/types/googleReview";
import { ListingPlaceMapping } from "@/app/types/listingPlaceMapping";
import { withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { ReviewType } from "@prisma/client";
import { createHash } from 'crypto';

function generateReviewId(googleReview: GoogleReview) {
  const uniqueString = `${googleReview.author_name}-${googleReview.time}`;
  return createHash('sha256').update(uniqueString).digest('hex');
}

export const POST = withAuth(async function handler(request: Request) {
    // Get list of ListingPlaceMapping from prisma
    const mappings: ListingPlaceMapping[] = await prisma.listingPlaceMapping.findMany();

    mappings.forEach(async mapping => {
        // Call the places_api
        const response = await fetch(`${process.env.PLACE_API_BASE}/details/json?place_id=${mapping.googlePlaceId}&fields=name,rating,user_ratings_total,reviews&key=${process.env.PLACE_API_KEY}`);
        const data = await response.json();
        // Extract place name
        const placeName = data.result.name;
        mapping.placeName = placeName;
        // Save
        await prisma.listingPlaceMapping.update({
            where: { id: mapping.id },
            data: { placeName }
        });
        // The reviews
        const reviews: GoogleReview[] = data.result.reviews || [];
        for (const googleReview of reviews) {
            const reviewId = generateReviewId(googleReview);
            // Check if review already exists
            const existingReview = await prisma.review.findUnique({
                where: { googleReviewUid: reviewId }
            });
            if (!existingReview) {
                // Create new review
                await prisma.review.create({
                    data: {
                        listingId: mapping.listingId,
                        hostawayId: null,
                        type: ReviewType.GUEST_TO_HOST,
                        rating: googleReview.rating*2, // Convert to 10 scale
                        publicReview: googleReview.text,
                        reviewCategory: [],
                        submittedAt: new Date(googleReview.time * 1000).toISOString(),
                        guestName: googleReview.author_name,
                        listingName: mapping.listingName || '',
                        channel: 'google',
                        isPublished: false,
                        googleReviewUid: reviewId
                    }
                });
            } else {
                // Review already exists, skip
                // A synchronization strategy might be added here
            }
        }
    });

    return new Response(JSON.stringify({
        status: 'success',
        message: 'Listing-Place mappings synchronized and reviews fetched',
        result: mappings
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
});