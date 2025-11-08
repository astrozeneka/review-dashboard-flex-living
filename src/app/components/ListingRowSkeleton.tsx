'use client';

export default function ListingRowSkeleton() {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            {/* Property name skeleton */}
            <td className="px-4 py-3">
                <div className="h-4 w-40 bg-gray-200 rounded animate-shimmer"></div>
            </td>

            {/* Location skeleton */}
            <td className="px-4 py-3">
                <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer mb-2"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-shimmer"></div>
            </td>

            {/* Rating skeleton */}
            <td className="px-4 py-3 text-center">
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-shimmer mx-auto"></div>
            </td>

            {/* Reviews count skeleton */}
            <td className="px-4 py-3 text-center">
                <div className="h-4 w-8 bg-gray-200 rounded animate-shimmer mx-auto"></div>
            </td>

            {/* Action button skeleton */}
            <td className="px-4 py-3 text-right">
                <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer ml-auto"></div>
            </td>
        </tr>
    );
}
