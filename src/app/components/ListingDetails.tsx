'use client';

import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { ReviewStatistics } from "../types/review";
import { StarRating } from "./StarRating";

interface ListingDetailsProps {
    listing: any;
    onClose?: () => void;
}

export default function ListingDetails({ listing, onClose }: ListingDetailsProps) {
    const { fetchListingDetailsById } = useApi();
    const [stats, setStats] = useState<ReviewStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { status, result, stats: fetchedStats } = await fetchListingDetailsById(listing.id);
                if (status === 'success' && fetchedStats) {
                    setStats(fetchedStats);
                }
            } catch (error) {
                console.error('Error fetching listing details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [listing, fetchListingDetailsById]);

    if (!listing) return <></>;

    return (
        <div className="space-y-4">
            {/* Header with Listing Name */}
            <div className="pb-3 border-b border-gray-200">
                {loading ? (
                    <>
                        <div className="h-6 w-56 bg-gray-200 rounded animate-shimmer mb-1"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded animate-shimmer"></div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">{listing.name}</h2>
                        <div className="flex items-center space-x-2 text-gray-600 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{listing.address}, {listing.city}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Performance Statistics */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Last 3 Months Skeleton */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="h-4 w-28 bg-gray-200 rounded animate-shimmer mb-2"></div>
                        <div className="flex items-end justify-between">
                            <div className="flex-1">
                                <div className="h-8 w-16 bg-gray-200 rounded animate-shimmer mb-1"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                            <div className="h-7 w-14 bg-green-200 rounded-lg animate-shimmer"></div>
                        </div>
                    </div>
                    {/* Overall Performance Skeleton */}
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer mb-2"></div>
                        <div>
                            <div className="h-8 w-16 bg-gray-200 rounded animate-shimmer mb-1"></div>
                            <div className="h-3 w-40 bg-gray-200 rounded animate-shimmer"></div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Star Distribution Skeleton */}
            {loading && (
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer mb-3"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-4 w-10 bg-gray-200 rounded animate-shimmer"></div>
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full animate-shimmer"></div>
                                <div className="h-4 w-10 bg-gray-200 rounded animate-shimmer"></div>
                                <div className="h-4 w-12 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Performance Statistics */}
            {stats && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Last 3 Months Performance */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <h3 className="text-xs font-semibold text-gray-900 uppercase mb-2">Last 3 Months</h3>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.lastThreeMonthsAverage.toFixed(1)}</p>
                                    <StarRating rating={stats.lastThreeMonthsAverage / 2} />
                                    <p className="text-xs text-gray-600 mt-0.5">Average Rating</p>
                                </div>
                                {stats.previousThreeMonthsAverage > 0 && (
                                    <div className={`flex items-center space-x-0.5 px-2 py-1 rounded text-xs font-semibold ${stats.lastThreeMonthsAverage >= stats.previousThreeMonthsAverage ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            {stats.lastThreeMonthsAverage >= stats.previousThreeMonthsAverage ? (
                                                <path fillRule="evenodd" d="M12 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L13 7.414V15a1 1 0 11-2 0V7.414L9.707 10.707a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd" />
                                            ) : (
                                                <path fillRule="evenodd" d="M12 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L11 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 1.414l-4 4z" clipRule="evenodd" />
                                            )}
                                        </svg>
                                        <span>{Math.abs(((stats.lastThreeMonthsAverage - stats.previousThreeMonthsAverage) / stats.previousThreeMonthsAverage) * 100).toFixed(0)}%</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Overall Performance */}
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                            <h3 className="text-xs font-semibold text-gray-900 uppercase mb-2">Overall Performance</h3>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.overallAverage.toFixed(1)}</p>
                                <StarRating rating={stats.overallAverage / 2} />
                                <p className="text-xs text-gray-600 mt-0.5">({stats.count} reviews)</p>
                            </div>
                        </div>
                    </div>

                    {/* Star Rating Distribution */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-xs font-semibold text-gray-900 uppercase mb-3">Review Distribution</h3>
                        <div className="space-y-2">
                            {[
                                { stars: 5, key: "10" },
                                { stars: 4, key: "8" },
                                { stars: 3, key: "6" },
                                { stars: 2, key: "4" },
                                { stars: 1, key: "2" }
                            ].map((rating) => {
                                const count = stats.starCount[rating.key as keyof typeof stats.starCount] || 0;
                                const percentage = stats.count > 0 ? (count / stats.count) * 100 : 0;
                                const starDisplay = '★'.repeat(rating.stars) + '☆'.repeat(5 - rating.stars);
                                return (
                                    <div key={rating.stars} className="flex items-center gap-2">
                                        <span className="text-xs text-gray-900 w-20">{starDisplay}</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-amber-400 h-1.5 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* Listing Details Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Info Skeleton */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer mb-2"></div>
                        <div className="space-y-2">
                            <div>
                                <div className="h-3 w-16 bg-gray-200 rounded animate-shimmer mb-0.5"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                            <div>
                                <div className="h-3 w-20 bg-gray-200 rounded animate-shimmer mb-0.5"></div>
                                <div className="h-4 w-28 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                        </div>
                    </div>

                    {/* Location Info Skeleton */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-shimmer mb-2"></div>
                        <div className="space-y-2">
                            <div>
                                <div className="h-3 w-12 bg-gray-200 rounded animate-shimmer mb-0.5"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                            <div>
                                <div className="h-3 w-16 bg-gray-200 rounded animate-shimmer mb-0.5"></div>
                                <div className="h-4 w-40 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-xs font-semibold text-gray-900 uppercase mb-2">Basic Information</h3>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wide">Property ID</p>
                                <p className="text-sm text-gray-900 font-medium">{listing.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wide">Property Type</p>
                                <p className="text-sm text-gray-900 font-medium">{listing.propertyType || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-xs font-semibold text-gray-900 uppercase mb-2">Location</h3>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wide">City</p>
                                <p className="text-sm text-gray-900 font-medium">{listing.city}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wide">Address</p>
                                <p className="text-sm text-gray-900 font-medium">{listing.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Additional Details */}
            {loading ? (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-shimmer mb-4"></div>
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-shimmer mb-2"></div>
                                <div className="h-7 w-12 bg-gray-200 rounded animate-shimmer"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                listing.bedrooms || listing.bathrooms || listing.maxGuests ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Accommodation Details</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {listing.bedrooms && (
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Bedrooms</p>
                                    <p className="text-2xl font-bold text-gray-900">{listing.bedrooms}</p>
                                </div>
                            )}
                            {listing.bathrooms && (
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Bathrooms</p>
                                    <p className="text-2xl font-bold text-gray-900">{listing.bathrooms}</p>
                                </div>
                            )}
                            {listing.maxGuests && (
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Max Guests</p>
                                    <p className="text-2xl font-bold text-gray-900">{listing.maxGuests}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null
            )}

            {/* Description */}
            {loading ? (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-shimmer mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded animate-shimmer"></div>
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-shimmer"></div>
                    </div>
                </div>
            ) : (
                listing.description && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">{listing.description}</p>
                    </div>
                )
            )}

            {/* Action Button */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Close'}
                </button>
                <button
                    onClick={() => window.open(`/property/${listing.id}`, '_blank')}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                >
                    View on Platform
                </button>
            </div>
        </div>
    );
}
