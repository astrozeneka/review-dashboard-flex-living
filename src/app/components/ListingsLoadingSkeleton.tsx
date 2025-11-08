'use client';

import ListingRowSkeleton from './ListingRowSkeleton';

interface ListingsLoadingSkeletonProps {
    count?: number;
}

export default function ListingsLoadingSkeleton({ count = 5 }: ListingsLoadingSkeletonProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Reviews</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...Array(count)].map((_, index) => (
                            <ListingRowSkeleton key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
