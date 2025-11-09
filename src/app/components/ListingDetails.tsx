'use client';

import { useEffect } from "react";
import { useApi } from "../contexts/ApiContext";

interface ListingDetailsProps {
    listing: any;
    onClose?: () => void;
}

export default function ListingDetails({ listing, onClose }: ListingDetailsProps) {
    if (!listing) return null;

    const { fetchListingDetailsById } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            const { status, result, stats } = await fetchListingDetailsById(listing.id);
            console.log({ status, result, stats });
        };
        fetchData();
    }, [listing]);

    return (
        <div className="space-y-6">
            {/* Header with Listing Name */}
            <div className="pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{listing.name}</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{listing.address}, {listing.city}</span>
                </div>
            </div>

            {/* Listing Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Property ID</p>
                            <p className="text-gray-900 font-medium">{listing.id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Property Type</p>
                            <p className="text-gray-900 font-medium">{listing.propertyType || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                {/* Location Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Location</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">City</p>
                            <p className="text-gray-900 font-medium">{listing.city}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Address</p>
                            <p className="text-gray-900 font-medium text-sm">{listing.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            {listing.bedrooms || listing.bathrooms || listing.maxGuests ? (
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
            ) : null}

            {/* Description */}
            {listing.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{listing.description}</p>
                </div>
            )}

            {/* Action Button */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
