'use client';

import { Review } from '../types/review';

interface ReviewApprovalFormProps {
    review: Review;
    onClose?: () => void;
}

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex items-center space-x-1">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}

            {/* Half star */}
            {halfStar === 1 && (
                <div className="relative w-5 h-5">
                    <svg className="absolute w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="absolute overflow-hidden w-1/2 h-full">
                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function getStatusBadgeClass(isPublished: boolean): string {
    return isPublished
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800';
}

function getChannelBadgeClass(channel: string): string {
    const classes: Record<string, string> = {
        'airbnb': 'bg-red-100 text-red-800',
        'booking': 'bg-blue-100 text-blue-800',
        'vrbo': 'bg-indigo-100 text-indigo-800',
        'direct': 'bg-green-100 text-green-800',
    };
    return classes[channel] || 'bg-gray-100 text-gray-800';
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

async function handleApproval(reviewId: number, action: 'approve' | 'reject') {
    // TODO: Implement API call to backend
    console.log(`Review ${reviewId} - Action: ${action}`);
}

export default function ReviewApprovalForm({ review, onClose }: ReviewApprovalFormProps) {
    return (
        <div className="space-y-6">
            {/* Header with Badges */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(review.isPublished)}`}>
                            {review.isPublished ? 'Published' : 'Pending'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getChannelBadgeClass(review.channel)}`}>
                            {review.channel.charAt(0).toUpperCase() + review.channel.slice(1)}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{review.listingName}</h2>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Guest Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                            {review.guestName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{review.guestName}</p>
                        <p className="text-sm text-gray-500">{formatDate(review.submittedAt)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    ======={review.rating}

                    <StarRating rating={((review.rating) ?? 0) / 2} />
                    <span className="text-2xl font-bold text-gray-900">{(review.rating ?? 0).toFixed(1)}</span>
                </div>
            </div>

            {/* Review Text */}
            <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
            </div>

            {/* Category Ratings */}
            {review.reviewCategory && review.reviewCategory.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Category Ratings</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {review.reviewCategory.map((cat, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="text-xs text-gray-500 mb-2 capitalize">
                                    {cat.category.replace(/_/g, ' ')}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <StarRating rating={cat.rating / 2} />
                                    <span className="font-semibold text-gray-900">{(cat.rating / 2).toFixed(1)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Review ID: {review.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0h-5" />
                    </svg>
                    <span>{review.listingName}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                {!review.isPublished ? (
                    <>
                        <button
                            onClick={() => handleApproval(review.id, 'reject')}
                            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => handleApproval(review.id, 'approve')}
                            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Approve Review
                        </button>
                    </>
                ) : (
                    <div className="w-full flex items-center justify-center space-x-2 text-green-600 py-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">This review has been published</span>
                    </div>
                )}
            </div>
        </div>
    );
}
