'use client';

import ReviewCardSkeleton from './ReviewCardSkeleton';

interface ReviewsLoadingSkeletonProps {
    count?: number;
}

export default function ReviewsLoadingSkeleton({ count = 6 }: ReviewsLoadingSkeletonProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {[...Array(count)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
            ))}
        </div>
    );
}
