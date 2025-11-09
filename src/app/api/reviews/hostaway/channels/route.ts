import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";

/**
 * Fetches the available review channels from the review service.
 * @param request 
 * @returns JSON response containing the list of channels.
 */
export const GET = async (request: Request) => {
    const channels: string[] = await reviewService.fetchChannels();
    return NextResponse.json({ channels });
};