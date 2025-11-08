'use client';

export default function ReviewCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header with badges and rating skeleton */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    {/* Badges skeleton */}
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-shimmer"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-shimmer"></div>
                    </div>
                    {/* Title skeleton */}
                    <div className="h-5 w-48 bg-gray-200 rounded animate-shimmer"></div>
                </div>
                {/* Rating skeleton */}
                <div className="flex items-center space-x-2 ml-2">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-5 w-5 bg-gray-200 rounded animate-shimmer"></div>
                        ))}
                    </div>
                    <div className="h-6 w-10 bg-gray-200 rounded animate-shimmer"></div>
                </div>
            </div>

            {/* Review text skeleton */}
            <div className="mb-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-shimmer"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Guest info and date skeleton */}
            <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer"></div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
            </div>
        </div>
    );
}
