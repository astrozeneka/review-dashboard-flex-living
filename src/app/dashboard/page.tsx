'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '../types/review';
import { useApi } from '../contexts/ApiContext';
import DetailModal from '../components/DetailModal';
import ReviewApprovalForm from '../components/ReviewApprovalForm';
import FilterBar, { FilterState } from '../components/FilterBar';
import ReviewCard from '../components/ReviewCard';
import ToastContainer from '../components/ToastContainer';
import ReviewsLoadingSkeleton from '../components/ReviewsLoadingSkeleton';
import { useToast } from '../hooks/useToast';

export default function Dashboard() {
    const { user, logout, token } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [listings, setListings] = useState<any[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
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

                // Load reviews
                try {
                    const hostawayReviewsResponse = await fetchHostawayReviews();
                    console.log("Hostaway Reviews Response:", hostawayReviewsResponse);
                    setReviews(hostawayReviewsResponse.result);
                } catch (error) {
                    // Error will be managed here
                }
            } finally {
                setIsReviewLoading(false);
            }
        };

        fetchData();

    }, [token, fetchHostawayReviews]);

    // Filter and sort reviews
    useEffect(() => {
        let result = [...reviews];

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

        setFilteredReviews(result);
    }, [reviews, filters]);

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

            <DetailModal isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setSelectedReview(null);
            }}>
                {selectedReview && (
                    <ReviewApprovalForm
                        review={selectedReview}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedReview(null);
                        }}
                        onReviewUpdated={(updatedReview) => {
                            const index = reviews.findIndex(r => r.id === updatedReview.id);
                            if (index !== -1) {
                                const updatedReviews = [...reviews];
                                updatedReviews[index] = updatedReview;
                                setReviews(updatedReviews);
                                addToast('Review approved successfully!', 'success');
                            }
                        }}
                    />
                )}
            </DetailModal>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4">
                {listings.map((listing) => (
                    <div key={listing.id} className="p-4 border rounded">
                        <h2 className="text-lg font-semibold">{listing.name}</h2>
                        <p className="text-gray-600">{listing.address}</p>
                        <p className="text-sm text-gray-500">{listing.city}, {listing.country}</p>
                    </div>
                ))}
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <FilterBar listings={listings} onFilterChange={setFilters} />

                {isReviewLoading ? (
                    <ReviewsLoadingSkeleton count={6} />
                ) : filteredReviews.length === 0 ? (
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
            </div>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} onClose={removeToast} />
        </div>
    );
}
