'use client';

import ReviewCardSkeleton from './ReviewCardSkeleton';

interface ReviewsLoadingSkeletonProps {
    count?: number;
}

/**
 * Renders a loading skeleton for the reviews grid while data is being fetched.
 * @param param0 
 * @returns JSX element representing the loading skeleton.
 */
export default function ReviewsLoadingSkeleton({ count = 6 }: ReviewsLoadingSkeletonProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {[...Array(count)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
            ))}
        </div>
    );
}
