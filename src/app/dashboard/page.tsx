'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '../types/review';
import { useApi } from '../contexts/ApiContext';
import DetailModal from '../components/DetailModal';
import ReviewApprovalForm from '../components/ReviewApprovalForm';
import ListingDetails from '../components/ListingDetails';
import FilterBar, { FilterState } from '../components/FilterBar';
import ReviewCard from '../components/ReviewCard';
import ListingRow from '../components/ListingRow';
import ToastContainer from '../components/ToastContainer';
import ReviewsLoadingSkeleton from '../components/ReviewsLoadingSkeleton';
import ListingsLoadingSkeleton from '../components/ListingsLoadingSkeleton';
import { useToast } from '../hooks/useToast';

export default function Dashboard() {
    const { user, logout, token } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [listings, setListings] = useState<any[]>([]);
    const [isListingLoading, setIsListingLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedListing, setSelectedListing] = useState<any>(null);
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewOffset, setReviewOffset] = useState(0);
    const [hasMoreReviews, setHasMoreReviews] = useState(true);
    const reviewPageSize = 12;
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        status: 'all',
        property: 'all',
        channel: 'all',
        topic: 'all',
        rating: 'all',
        sort: 'date-desc',
    });
    const { fetchHostawayReviews } = useApi();
    const { toasts, addToast, removeToast } = useToast();

    // TODO: move this code to a suitable section
    useEffect(() => {
        console.log("IsReviewLoading:", isReviewLoading);
        if (!token || isReviewLoading) {
            return;
        }

        const fetchData = async () => {
            setIsReviewLoading(true);
            setIsListingLoading(true);
            try {
                // Load listings data
                const response = await fetch('/api/listings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    setError('Failed to load listings');
                    return;
                }

                const data = await response.json();
                setListings(data.listings);
                setIsListingLoading(false);

                // Load reviews
                try {
                    const hostawayReviewsResponse = await fetchHostawayReviews(0, reviewPageSize);
                    setReviews(hostawayReviewsResponse.result);
                    setHasMoreReviews(hostawayReviewsResponse.hasMore);
                } catch (error) {
                    // Error will be managed here
                }
            } finally {
                setIsReviewLoading(false);
                setIsListingLoading(false);
            }
        };

        fetchData();

    }, [token, fetchHostawayReviews]);

    // Filter and sort reviews
    useEffect(() => {
        /*let result = [...reviews];

        // Apply status filter
        if (filters.status !== 'all') {
            result = result.filter(r => {
                const status = r.isPublished ? 'approved' : 'pending';
                return status === filters.status;
            });
        }

        // Apply property filter
        if (filters.property !== 'all') {
            result = result.filter(r => r.listingName === filters.property);
        }

        // Apply channel filter
        if (filters.channel !== 'all') {
            result = result.filter(r => r.channel === filters.channel);
        }

        // Apply topic filter
        if (filters.topic !== 'all') {
            result = result.filter(r => {
                if (!r.reviewCategory) return false;
                return r.reviewCategory.some(cat => cat.category === filters.topic);
            });
        }

        // Apply rating filter
        if (filters.rating !== 'all') {
            const minRating = parseFloat(filters.rating);
            result = result.filter(r => (r.rating || 0) >= minRating);
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (filters.sort) {
                case 'date-desc':
                    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
                case 'date-asc':
                    return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
                case 'rating-desc':
                    return (b.rating || 0) - (a.rating || 0);
                case 'rating-asc':
                    return (a.rating || 0) - (b.rating || 0);
                default:
                    return 0;
            }
        });

        setFilteredReviews(result);*/

        // console.log("Applying filters:", filters);

        // Clear reviews
        setFilteredReviews(reviews);
        // setReviews([]);
    }, [reviews]);

    useEffect(() => {
        setFilteredReviews(reviews);
        // If 'status' filter is applied
        setReviews([]);
        loadReviews(0, reviewPageSize, token!, filters.status);
        console.log("Filters changed, reloading reviews:", filters);

    }, [filters]);

    // Function to load more reviews for pagination
    const loadReviews = async (offset: number, limit: number, token: string, status: 'all' | 'published' | 'unpublished') => {
        if (!token) return;
        setIsReviewLoading(true);
        console.log("Loading more reviews:", offset, limit);
        try {
            const response = fetchHostawayReviews(offset, limit, status);
            const data = await response;
            console.log("Fetched Reviews:", data.result.length);
            setReviews((prevReviews) => [...prevReviews, ...data.result]);
            setReviewOffset(offset + limit);
            setHasMoreReviews(data.hasMore);
        } catch (error) {
            console.error("Error fetching more reviews:", error);
        } finally {
            // Wait 1s
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setIsReviewLoading(false);
        }
    }

    // Keep track of the scroll status to manage pagination
    useEffect(() => {
        if (!token) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const remainingScroll = docHeight - (scrollTop + winHeight);
            if (remainingScroll < 600 && !isReviewLoading && hasMoreReviews) {
                // User is near the bottom of the page
                // setReviewOffset((prevOffset) => prevOffset + reviewPageSize);
                loadReviews(reviewOffset + reviewPageSize, reviewPageSize, token, filters.status);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [token, reviewOffset, isReviewLoading, filters.status]);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(`/api/listings?match=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.listings || []);
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        // Redirect to login page after logout
        console.log('Logging out and redirecting to login page');
        router.push('/login');
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Hello {(user as any)?.name || ''}</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        View Details
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <DetailModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedReview(null);
                }}
                title="Review Details"
            >
                {selectedReview && (
                    <ReviewApprovalForm
                        review={selectedReview}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedReview(null);
                        }}
                        onReviewUpdated={(updatedReview, listingStats) => {
                            const index = reviews.findIndex(r => r.id === updatedReview.id);
                            if (index !== -1) {
                                const updatedReviews = [...reviews];
                                updatedReviews[index] = updatedReview;
                                setReviews(updatedReviews);
                                addToast('Review approved successfully!', 'success');
                            }


                            // Reload the property listings related to the review
                            const updatedRatingAverage = listingStats?.overallAverage || 0;
                            console.log("Updated Average:", updatedRatingAverage);
                            const listingIndex = listings.findIndex(l => l.id === updatedReview.listingId);
                            if (listingIndex !== -1) {
                                const updatedListings = [...listings];
                                updatedListings[listingIndex] = {
                                    ...updatedListings[listingIndex],
                                    averageRating: updatedRatingAverage,
                                };
                                setListings(updatedListings);
                            }
                        }}
                    />
                )}
            </DetailModal>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Listings Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Listings</h2>
                <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    disabled={isReviewLoading}
                />
                {isListingLoading ? (
                    <ListingsLoadingSkeleton count={5} />
                ) : (
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
                                    {(searchQuery.trim() ? searchResults : listings).map((listing) => (
                                        <ListingRow
                                            key={listing.id}
                                            listing={listing}
                                            onViewDetails={(listing) => {
                                                setSelectedListing(listing);
                                                setIsListingModalOpen(true);
                                            }}
                                            onTriggerReviewFilter={(listing) => {
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    property: listing.name,
                                                }));
                                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                                // Set the selectbox programmaticaly
                                                const filterPropertySelect = document.getElementById('filterProperty') as HTMLSelectElement;
                                                if (filterPropertySelect) {
                                                    filterPropertySelect.value = listing.name;
                                                }
                                            }}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <FilterBar listings={listings} onFilterChange={setFilters} />

                {(filteredReviews.length === 0 && !isReviewLoading) ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center mt-6">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
                        <p className="text-gray-600">Try adjusting your filters to see more reviews.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                        {filteredReviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onViewDetails={(selectedReview) => {
                                    setSelectedReview(selectedReview);
                                    setIsModalOpen(true);
                                }}
                                onApprove={(reviewToApprove) => {
                                    setSelectedReview(reviewToApprove);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* 'hasMoreReviews' is used to preserve the scroll position */}
                {(isReviewLoading || hasMoreReviews) ? (
                    <ReviewsLoadingSkeleton count={6} />
                ) : <></>}
            </div>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} onClose={removeToast} />

            {/* Listing Modal */}
            <DetailModal
                isOpen={isListingModalOpen}
                onClose={() => {
                    setIsListingModalOpen(false);
                    setSelectedListing(null);
                }}
                title="Listing Details"
            >
                {selectedListing && (
                    <ListingDetails
                        listing={selectedListing}
                        onClose={() => {
                            setIsListingModalOpen(false);
                            setSelectedListing(null);
                        }}
                    />
                )}
            </DetailModal>
        </div>
    );
}
