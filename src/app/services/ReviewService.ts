import { prisma } from "@/lib/prisma";
import { Review } from "../types/review";


class ReviewService {

    /**
     * Fetch all reviews from the database.
     * @returns A promise that resolves to an array of Review objects.
     */
    async fetchReviews(): Promise<Review[]> {
        const reviews: any[]= await prisma.review.findMany();
        // Parse the review category
        reviews.forEach(review => {
            if (review.reviewCategory && typeof review.reviewCategory === 'string') {
                review.reviewCategory = JSON.parse(review.reviewCategory);
            }
        });
        return reviews as Review[];
    }

    /**
     * Fetch a review by its associated listing ID.
     * @param listingId - The ID of the listing whose review is to be fetched.
     * @returns A promise that resolves to the Review object if found, or null if not found.
     */
    async fetchReviewsByListingId(listingId: string, publishedOnly: boolean = true): Promise<Review[] | null> {
        const reviews: any[] = await prisma.review.findMany({
            where: {
                listingId: parseInt(listingId),
                ...(publishedOnly && { isPublished: true }),
            },
        });
        // Parse the review category
        reviews.forEach(review => {
            if (review.reviewCategory && typeof review.reviewCategory === 'string') {
                review.reviewCategory = JSON.parse(review.reviewCategory);
            }
        });
        return reviews as Review[];
    }

    /**
     * Fetch a review by its ID.
     * @param reviewId - The ID of the review to be fetched.
     * @returns A promise that resolves to the Review object if found, or null if not found.
     */
    async fetchReviewById(reviewId: string): Promise<Review | null> {
        const review: any = await prisma.review.findUnique({
            where: {
                id: parseInt(reviewId),
            },
        });
        // Parse the review category
        if (review && review.reviewCategory && typeof review.reviewCategory === 'string') {
            review.reviewCategory = JSON.parse(review.reviewCategory);
        }
        return review as Review | null;
    }

    /**
     * Approve a review by setting its isPublished field to true.
     * @param reviewId - The ID of the review to be approved.
     * @returns A promise that resolves to the updated Review object.
     */
    async approveReview(reviewId: string): Promise<Review | null> {
        const updatedReview: any = await prisma.review.update({
            where: {
                id: parseInt(reviewId),
            },
            data: {
                isPublished: true,
            },
        });
        // Parse the review category
        if (updatedReview && updatedReview.reviewCategory && typeof updatedReview.reviewCategory === 'string') {
            updatedReview.reviewCategory = JSON.parse(updatedReview.reviewCategory);
        }
        return updatedReview as Review | null;
    }
}
// Singleton instance
export const reviewService = new ReviewService();