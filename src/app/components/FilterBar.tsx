'use client';

import { SortingCriteria } from "../types/review";

interface FilterBarProps {
    listings: any[];
    onFilterChange: (filters: FilterState) => void;
    channelOptions?: string[];
}

export interface FilterState {
    status: "all" | "published" | "unpublished";
    property: string;
    channel: string;
    topic: string;
    rating: string;
    sort: string;
}

export default function FilterBar({ listings, onFilterChange, channelOptions }: FilterBarProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const currentFilters = {
            status: (document.getElementById('filterStatus') as HTMLSelectElement)?.value as "all" | "published" | "unpublished"|| 'all',
            property: (document.getElementById('filterProperty') as HTMLSelectElement)?.value || 'all',
            channel: (document.getElementById('filterChannel') as HTMLSelectElement)?.value || 'all',
            topic: (document.getElementById('filterTopic') as HTMLSelectElement)?.value || 'all',
            rating: (document.getElementById('filterRating') as HTMLSelectElement)?.value || 'all',
            sort: (document.getElementById('sortBy') as HTMLSelectElement)?.value || 'date_desc',
        };
        currentFilters[name as keyof FilterState] = value as any;
        onFilterChange(currentFilters);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="filterStatus" name="status" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Reviews</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                    <select id="filterProperty" name="property" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Properties</option>
                        {listings.map((listing) => (
                            <option key={listing.id} value={listing.name}>{listing.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                    <select id="filterChannel" name="channel" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Channels</option>
                        {channelOptions && channelOptions.map((channel:string) => (
                            <option key={channel} value={channel}>{channel}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select id="filterRating" name="rating" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select id="sortBy" name="sort" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                        <option value="rating_desc">Highest Rating</option>
                        <option value="rating_asc">Lowest Rating</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
