export const AmenityIconMap: Record<string, React.ReactNode> = {
    // Kitchen & Dining
    'Toaster': '<rect x="8" y="3" width="8" height="18" rx="1"/><path d="M10 8h4"/><path d="M10 12h4"/>',
    'Microwave': '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    'Refrigerator': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'Stove': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'Oven': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'Electric kettle': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'Kitchen utensils': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>',
    'Dining table': '<rect x="2" y="2" width="20" height="20" rx="2"/>',
    'Dining area': '<rect x="2" y="2" width="20" height="20" rx="2"/>',

    // Bathroom
    'Shower': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'Tub': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'Toilet': '<circle cx="12" cy="12" r="10"/>',
    'Towels': '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    'Shampoo': '<path d="M3 3h18v18H3z"/>',
    'Hot water': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',

    // Bedroom & Storage
    'Heating': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'Clothing storage': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    'Hangers': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    'Drying rack for clothing': '<rect x="4" y="4" width="16" height="16" rx="2"/>',

    // Entertainment & Connectivity
    'TV': '<rect x="3" y="3" width="18" height="18" rx="2"/>',
    'Smart TV': '<rect x="3" y="3" width="18" height="18" rx="2"/>',
    'Cable TV': '<rect x="3" y="3" width="18" height="18" rx="2"/>',
    'Internet': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'Free WiFi': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'Wireless': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',
    'WiFi speed (25+ Mbps)': '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>',

    // Laundry
    'Washing Machine': '<circle cx="12" cy="12" r="10"/>',
    'Iron board': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'Iron': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',

    // Essentials
    'Linens': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>',
    'Essentials': '<circle cx="12" cy="12" r="10"/>',
    'Cleaning products': '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    'Body soap': '<path d="M3 3h18v18H3z"/>',
    'Shower gel': '<path d="M3 3h18v18H3z"/>',
    'Conditioner': '<path d="M3 3h18v18H3z"/>',

    // Parking & Access
    'Street parking': '<rect x="3" y="3" width="18" height="18" rx="2"/>',
    '24-hour checkin': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'Contactless Check-In/Out': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',

    // Safety
    'Smoke detector': '<circle cx="12" cy="12" r="10"/><path d="M12 9v6"/>',
    'Carbon Monoxide Detector': '<circle cx="12" cy="12" r="10"/><path d="M12 9v6"/>',

    // Features
    'Private living room': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>',
    'Suitable for children': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    'Suitable for infants': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3"/>',
    'Long term stays allowed': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'Enhanced Cleaning Practices': '<path d="M3 9h18v12c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V9z"/>',
    'Wine glasses': '<path d="M6 4h12v5c0 1.66-1.34 3-3 3h-6c-1.66 0-3-1.34-3-3V4z"/>',
};

export function getAmenityIcon(amenityName: string): string {
    return AmenityIconMap[amenityName] || '<circle cx="12" cy="12" r="10"/>';
}

export const commonAmenities = [
    'Cable TV',
    'Internet',
    'Wireless',
    'Washing Machine',
    '24-hour checkin',
    'Heating',
    'Smoke detector',
    'Carbon Monoxide Detector',
    'Essentials',
    'Shampoo',
    'Hangers',
    'Iron',
    'TV',
    'Street parking',
    'Private living room',
    'Suitable for children',
    'Suitable for infants',
    'Iron board',
    'Linens',
    'Toaster',
    'Microwave',
    'Shower',
    'Tub',
    'Stove',
    'Electric kettle',
    'Refrigerator',
    'Towels',
    'Kitchen utensils',
    'Hot water',
    'Toilet',
    'Dining area',
    'Free WiFi',
    'WiFi speed (25+ Mbps)',
    'Smart TV',
    'Dining table',
    'Cleaning products',
    'Body soap',
    'Shower gel',
    'Conditioner',
    'Clothing storage',
    'Drying rack for clothing',
    'Portable fans',
    'Freezer',
    'Wine glasses',
    'Contactless Check-In/Out',
    'Enhanced Cleaning Practices',
    'Long term stays allowed',
    'Oven',
];
