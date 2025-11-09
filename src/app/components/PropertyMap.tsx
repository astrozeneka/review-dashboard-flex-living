'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
    lat: number;
    lng: number;
    propertyName: string;
}

export function PropertyMap({ lat, lng, propertyName }: PropertyMapProps) {
    useEffect(() => {
        const mapContainer = document.getElementById('property-map');
        if (!mapContainer || mapContainer.children.length > 0) return;

        // Initialize map
        const map = L.map('property-map').setView([lat, lng], 15);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add marker
        const customIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0IiBmaWxsPSIjM0Q0QTNCIi8+PHBhdGggZD0iTTIxIDEwYzAgNy05IDEzLTkgMTNzLTktNi05LTEzYTkgOSAwIDAgMSAxOCAweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM0Q0QTNCIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(propertyName);

        // Cleanup function
        return () => {
            map.remove();
        };
    }, [lat, lng, propertyName]);

    return (
        <div
            id="property-map"
            className="w-full h-96 bg-white rounded-lg overflow-hidden border border-gray-200"
        />
    );
}
