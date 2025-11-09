import { reviewService } from "@/app/services/ReviewService";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
    const channels: string[] = await reviewService.fetchChannels();
    return NextResponse.json({ channels });
};