import { prisma } from "@/lib/prisma";
import { Review } from "../types/review";


class ReviewService {

    /**
     * Fetch all reviews from the database.
     * @returns A promise that resolves to an array of Review objects.
     */
    async fetchReviews(): Promise<Review[]> {
        const reviews: Review[] = await prisma.review.findMany();
        return reviews;
    }

    /**
     * Fetch a review by its associated listing ID.
     * @param listingId - The ID of the listing whose review is to be fetched.
     * @returns A promise that resolves to the Review object if found, or null if not found.
     */
    async fetchReviewsByListingId(listingId: string, publishedOnly: boolean = true): Promise<Review[] | null> {
        const reviews = await prisma.review.findMany({
            where: {
                listingId: parseInt(listingId),
                ...(publishedOnly && { isPublished: true }),
            },
        });
        return reviews;
    }
}
// Singleton instance
export const reviewService = new ReviewService();