'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Review } from '../types/review';
import { useApi } from '../contexts/ApiContext';
import DetailModal from '../components/DetailModal';
import ReviewApprovalForm from '../components/ReviewApprovalForm';

export default function Dashboard() {
    const { user, logout, token } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [listings, setListings] = useState<any[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const { fetchHostawayReviews } = useApi();

    // TODO: move this code to a suitable section
    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchData = async () => {
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

        };

        fetchData();

    }, [token, fetchHostawayReviews]);

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
                {reviews.length === 0 ? (
                    <p>No reviews available.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-4 border rounded bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">Review by {review.guestName}</h3>
                                        <p className="text-yellow-500">Rating: {review.rating ?? 'N/A'}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedReview(review);
                                            setIsModalOpen(true);
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                                    >
                                        View Details
                                    </button>
                                </div>
                                <p className="mt-2">{review.publicReview}</p>
                                <p className="text-sm text-gray-500 mt-1">Submitted on: {new Date(review.submittedAt).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500 mt-1">Status: {review.isPublished ? 'Published' : 'Pending'}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
