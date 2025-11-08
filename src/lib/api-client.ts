import { Review } from "@/app/services/review";


export async function fetchHostawayReviews(token: string): Promise <{status: string; result: Review[]}> {
    const response = await fetch('/api/reviews/hostaway', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch hostaway reviews, status: ' + response.status);
    }
    const data = await response.json();
    return data as {status: string; result: Review[]};
}