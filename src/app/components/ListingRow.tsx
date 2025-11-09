'use client';

interface ListingRowProps {
    listing: {
        id: string;
        name: string;
        city: string;
        address: string;
        reviewsCount: number;
        averageRating: number | null;
    };
    onViewDetails: (listing: any) => void;
    onTriggerReviewFilter?: (listing: any) => void;
}

/**
 * Renders a single row in the listings (property) table with details and action buttons.
 * @param param0 
 * @returns JSX element representing a listing row.
 */
export default function ListingRow({ listing, onViewDetails, onTriggerReviewFilter }: ListingRowProps) {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{listing.name}</p>
            </td>
            <td className="px-4 py-3">
                <p className="text-sm text-gray-900">{listing.city}</p>
                <p className="text-xs text-gray-500">{listing.address}</p>
            </td>
            <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-50">
                    {listing.averageRating ? listing.averageRating.toFixed(1) : 'N/A'}
                </span>
            </td>
            <td className="px-4 py-3 text-center">
                <span className="text-sm text-gray-900">{listing.reviewsCount}</span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => onViewDetails(listing)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Details
                    </button>
                    <button
                        onClick={() => onTriggerReviewFilter?.(listing)}
                        className="px-3 py-2 bg-slate-600 text-white text-sm font-medium rounded-md hover:bg-slate-700 transition-colors"
                    >
                        Reviews
                    </button>
                </div>
            </td>
        </tr>
    );
}
