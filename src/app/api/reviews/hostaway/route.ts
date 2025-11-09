import { Review } from "@/app/types/review";
import { reviewService } from "@/app/services/ReviewService";
import { AuthenticatedRequest, withAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { off } from "process";

export const dynamic = 'force-dynamic';

export const GET = withAuth(async function handler(request: AuthenticatedRequest) {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const status: 'all' | 'approved' | 'pending' = (searchParams.get('status') as 'all' | 'approved' | 'pending') || 'all';
    const propertyName = searchParams.get('propertyName');
    const channel = searchParams.get('channel');
    // const topic = searchParams.get('topic');
    const rating = searchParams.get('rating'); // 1 to 10
    const sortingCriteria = searchParams.get('sortingCriteria') || 'date_desc'; // date_asc, date_desc, rating_asc, rating_desc

    // Return all reviews if no query params are provided
    const reviews: Review[] = await reviewService.fetchReviews(offset, limit, status === 'approved' ? true : status === 'pending' ? false : undefined);
    // Fetch if there are more reviews to load by checking offset+limit
    const hasMore = await reviewService.fetchReviews(offset + limit, 1, status === 'approved' ? true : status === 'pending' ? false : undefined);

    return NextResponse.json({
        status: 'success',
        result: reviews,
        hasMore: hasMore.length > 0,
    });
});