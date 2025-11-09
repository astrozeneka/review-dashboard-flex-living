import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const reviews = await reviewService.fetchReviewsByListingId(id);

    return NextResponse.json({
        status: 'success',
        result: reviews
    });
}