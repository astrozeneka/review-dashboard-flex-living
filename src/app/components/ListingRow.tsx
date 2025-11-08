'use client';

interface ListingRowProps {
    listing: {
        id: string;
        name: string;
        city: string;
        address: string;
    };
    onViewDetails: (listing: any) => void;
}

export default function ListingRow({ listing, onViewDetails }: ListingRowProps) {
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
                    N/A
                </span>
            </td>
            <td className="px-4 py-3 text-center">
                <span className="text-sm text-gray-900">N/A</span>
            </td>
            <td className="px-4 py-3 text-right">
                <button
                    onClick={() => onViewDetails(listing)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Details →
                </button>
            </td>
        </tr>
    );
}
