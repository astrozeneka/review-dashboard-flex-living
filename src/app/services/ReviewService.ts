import { prisma } from "@/lib/prisma";
import { Review } from "./review";


class ReviewService {
    async fetchReviews(): Promise<Review[]> {
        const reviews: Review[] = await prisma.review.findMany();
        return reviews;
    }
}
// Singleton instance
export const reviewService = new ReviewService();