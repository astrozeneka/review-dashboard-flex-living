'use client';

interface FilterBarProps {
    listings: any[];
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    status: "all" | "published" | "unpublished";
    property: string;
    channel: string;
    topic: string;
    rating: string;
    sort: string;
}

export default function FilterBar({ listings, onFilterChange }: FilterBarProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const currentFilters = {
            status: (document.getElementById('filterStatus') as HTMLSelectElement)?.value as "all" | "published" | "unpublished"|| 'all',
            property: (document.getElementById('filterProperty') as HTMLSelectElement)?.value || 'all',
            channel: (document.getElementById('filterChannel') as HTMLSelectElement)?.value || 'all',
            topic: (document.getElementById('filterTopic') as HTMLSelectElement)?.value || 'all',
            rating: (document.getElementById('filterRating') as HTMLSelectElement)?.value || 'all',
            sort: (document.getElementById('sortBy') as HTMLSelectElement)?.value || 'date-desc',
        };
        currentFilters[name as keyof FilterState] = value as any;
        onFilterChange(currentFilters);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="filterStatus" name="status" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Reviews</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
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
                        <option value="Airbnb">Airbnb</option>
                        <option value="Booking">Booking.com</option>
                        <option value="VRBO">VRBO</option>
                        <option value="Direct">Direct</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                    <select id="filterTopic" name="topic" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Topics</option>
                        <option value="cleanliness">Cleanliness</option>
                        <option value="communication">Communication</option>
                        <option value="location">Location</option>
                        <option value="value">Value</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select id="filterRating" name="rating" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4+ Stars</option>
                        <option value="3">3+ Stars</option>
                        <option value="2">2+ Stars</option>
                        <option value="1">1+ Stars</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select id="sortBy" name="sort" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="rating-desc">Highest Rating</option>
                        <option value="rating-asc">Lowest Rating</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
