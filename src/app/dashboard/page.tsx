'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { user, logout, token } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [listings, setListings] = useState<any[]>([]);

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
        };

        fetchData();

    }, [token]);

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
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

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
        </div>
    );
}
