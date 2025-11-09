'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Review, SortingCriteria } from '../types/review';
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
    const [channels, setChannels] = useState<string[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const isLoadingRef = useRef(false);
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
        // Just map reviews to filteredReviews
        setFilteredReviews(reviews);
    }, [reviews]);

    //  Load list of channels for filter bar
    useEffect(() => {
        const loadChannels = async () => {
            try {
                const response = await fetch('/api/reviews/hostaway/channels');
                if (response.ok) {
                    const data = await response.json();
                    // Set channels in filter bar
                    setChannels(data.channels);
                };
            } catch (error) {
                console.error("Error fetching channels:", error);
            }
        };
        loadChannels();
    }, []);

    // Reload reviews when filters change
    useEffect(() => {
        setFilteredReviews(reviews);
        // If 'status' filter is applied
        setReviews([]);
        loadReviews(0, reviewPageSize, token!, filters.status, filters.channel, filters.property, parseInt(filters.rating), filters.sort as SortingCriteria);

    }, [filters]);

    // Function to load more reviews for pagination
    const loadReviews = async (offset: number, limit: number, token: string, status: 'all' | 'published' | 'unpublished', channel: string = 'all', propertyName: string = '', rating: number | undefined = undefined, sortingCriteria: SortingCriteria = 'date_desc') => {
        if (!token || isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsReviewLoading(true);
        try {
            const response = fetchHostawayReviews(offset, limit, status, channel, propertyName, rating, sortingCriteria);
            const data = await response;
            if (offset === 0){
                setReviews([]);
            }
            setReviews((prevReviews) => [...prevReviews, ...data.result]);
            setReviewOffset(offset + limit);
            setHasMoreReviews(data.hasMore);
        } catch (error) {
            console.error("Error fetching more reviews:", error);
        } finally {
            // Wait 1s
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setIsReviewLoading(false);
            isLoadingRef.current = false;
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

    // Handle search input
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

    // Handle logout button click
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        // Redirect to login page after logout
        router.push('/login');
    }

    return (
        <div>
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="px-8 py-6 flex items-center justify-between">
                    <div className="flexliving-logo" style={{ color: "#3D4A3B" }}>
                        <span style={{ color: "#B4E051" }}>F</span>LEXLIVING
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-700">👋 Hello {(user as any)?.name || 'Ryan'}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="p-8">

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
                <h2 className="text-2xl font-bold mb-5 mt-8">Listings</h2>
                <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    disabled={isListingLoading}
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
                <h2 className="text-2xl font-bold mb-5 mt-8">Reviews</h2>
                <FilterBar listings={listings} onFilterChange={setFilters} channelOptions={channels} />

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
                    <ReviewsLoadingSkeleton count={3} />
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
        </div>
    );
}
