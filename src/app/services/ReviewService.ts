import { prisma } from "@/lib/prisma";
import { Review, ReviewStatistics, StarCount, SortingCriteria } from "../types/review";

/**
 * Service class for managing reviews.
 * This service class aims to mock the behavior of Hostaway's review API
 */
class ReviewService {

    /**
     * Fetch all reviews from the database.
     * @returns A promise that resolves to an array of Review objects.
     */
    async fetchReviews(offset?: number, limit?: number, isPublished?: boolean, channel?: string, propertyName?: string, rating?: number, sortingCriteria?: SortingCriteria): Promise<Review[]> {
        if (offset === undefined) offset = 0;
        if (limit === undefined) limit = 12;

        // Rating ranges from 0 to 5 but the database stores from 0 to 10
        let ratingMin, ratingMax;
        if (rating !== undefined) {
            ratingMin = rating * 2 - 2;
            ratingMax = ratingMin + 2;
        }

        const reviews: any[]= await prisma.review.findMany({
            orderBy: {
                ...(sortingCriteria === 'date_asc' && { submittedAt: 'asc' }),
                ...(sortingCriteria === 'date_desc' && { submittedAt: 'desc' }),
                ...(sortingCriteria === 'rating_asc' && { rating: 'asc' }),
                ...(sortingCriteria === 'rating_desc' && { rating: 'desc' }),
            },
            skip: offset,
            take: limit,
            where: {
                ...(isPublished !== undefined && { isPublished }),
                ...(channel !== 'all' && { channel }),
                ...((propertyName !== undefined && propertyName !== 'all') && { listingName: propertyName }),
                ...(rating !== undefined && { rating: { gt: ratingMin, lte: ratingMax } }),
            },
        });

        // Parse the review category
        reviews.forEach(review => {
            if (review.reviewCategory && typeof review.reviewCategory === 'string') {
                review.reviewCategory = JSON.parse(review.reviewCategory);
            }
            // Sometimes rating needs to be computed
            if (review.rating === null) {
                const categories = review.reviewCategory as { category: string; rating: number }[] | null;
                console.log(categories)
                const averageRating = categories && categories.length > 0
                    ? categories.reduce((sum, curr) => sum + curr.rating, 0) / categories.length
                    : null;
                review.rating = averageRating;
                prisma.review.update({
                    where: { id: review.id },
                    data: { rating: averageRating },
                });
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
     * Fetch the count of reviews for a specific listing ID.
     * @param listingId - The ID of the listing whose review count is to be fetched.
     * @param publishedOnly - Whether to count only published reviews.
     * @returns A promise that resolves to the count of reviews.
     */
    async fetchReviewsCountByListingId(listingId: string, publishedOnly: boolean = true): Promise<number> {
        const count: number = await prisma.review.count({
            where: {
                listingId: parseInt(listingId),
                ...(publishedOnly && { isPublished: true }),
            },
        });
        return count;
    }

    async fetchReviewStatsByListingId(listingId: string): Promise<ReviewStatistics> {
        // Last trimester average
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const lastThreeMonthsAverage: number = await prisma.review.aggregate({
            where: {
                listingId: parseInt(listingId),
                isPublished: true,
                submittedAt: {
                    gte: threeMonthsAgo,
                },
            },
            _avg: {
                rating: true,
            },
        }).then(result => result._avg.rating || 0);

        // Previous trimester average
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const previousThreeMonthsAverage: number = await prisma.review.aggregate({
            where: {
                listingId: parseInt(listingId),
                isPublished: true,
                submittedAt: {
                    gte: sixMonthsAgo,
                    lt: threeMonthsAgo,
                },
            },
            _avg: {
                rating: true,
            },
        }).then(result => result._avg.rating || 0);

        // Overall average
        const overallAverage: number = await prisma.review.aggregate({
            where: {
                listingId: parseInt(listingId),
                isPublished: true,
            },
            _avg: {
                rating: true,
            },
        }).then(result => result._avg.rating || 0);

        // Count
        const count: number = await prisma.review.count({
            where: {
                listingId: parseInt(listingId),
                isPublished: true,
            },
        });

        // Aggregate by star count (2, 4, 6, 8, 10 since rating is from 1 to 10)
        const starCount: StarCount = {
            "2": 0,
            "4": 0,
            "6": 0,
            "8": 0,
            "10": 0,
        };
        for (let i = 2; i <= 10; i += 2) {
            starCount[i.toString() as keyof StarCount] = await prisma.review.count({
                where: {
                    listingId: parseInt(listingId),
                    isPublished: true,
                    rating: i,
                },
            });
        }

        return {
            lastThreeMonthsAverage,
            previousThreeMonthsAverage,
            overallAverage,
            count,
            starCount
        };
    }

    /**
     * Fetch the average rating for a specific listing ID.
     * @param listingId - The ID of the listing whose average rating is to be fetched.
     * @returns A promise that resolves to the average rating.
     */
    async fetchAverageRatingByListingId(listingId: string): Promise<number> {
        const result: any = await prisma.review.aggregate({
            where: {
                listingId: parseInt(listingId),
                isPublished: true,
            },
            _avg: {
                rating: true,
            },
        });
        return result._avg.rating || 0;
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

    /**
     * Fetch distinct review channels.
     * @returns A promise that resolves to an array of distinct channel names.
     */
    async fetchChannels(): Promise<string[]> {
        const channels: any[] = await prisma.review.findMany({
            distinct: ['channel'],
            select: {
                channel: true,
            },
        });
        return channels.map(c => c.channel);
    }

    /**
     * Fetch recurring issues for a specific listing ID.
     * @param listingId - The ID of the listing whose recurring issues are to be fetched.
     * @returns A promise that resolves to the recurring issues object if found, or null if not found.
     */
    async fetchRecurringIssueByListingId(listingId: string): Promise<any | null> {
        const recurringIssue = await prisma.recurringIssue.findUnique({
            where: {
                listingId: parseInt(listingId),
            },
        });
        return recurringIssue;
    }
}
// Singleton instance
export const reviewService = new ReviewService();