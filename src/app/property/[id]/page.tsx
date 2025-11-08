import { listingService } from "@/app/services/ListingService";
import { Property } from "@/app/types/property";

export default async function PropertyDetail({ params }: { params: { id: string } }) {
    const listing: Property | null = await listingService.fetchListingById(params.id);

    if (!listing) {
        return <div className="flex items-center justify-center h-screen">Listing not found</div>;
    }

    const sortedImages = listing.listingImages?.sort((a, b) => a.sortOrder - b.sortOrder) || [];
    const mainImage = sortedImages[0];
    const additionalImages = sortedImages.slice(1, 4);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                .flexliving-logo {
                    font-weight: 700;
                    font-size: 24px;
                    letter-spacing: -0.5px;
                }

                .property-title {
                    font-size: 36px;
                    font-weight: 700;
                    line-height: 1.2;
                }

                .image-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 8px;
                    height: 480px;
                }

                .image-grid-right {
                    display: grid;
                    grid-template-rows: repeat(2, 1fr);
                    gap: 8px;
                }

                .image-container {
                    position: relative;
                    overflow: hidden;
                    border-radius: 0;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .voir-emplacement-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #3D4A3B;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 24px;
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border: none;
                    cursor: pointer;
                }

                .voir-emplacement-btn:hover {
                    background: #2D3A2B;
                }
            `}</style>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-gray-700 hover:text-gray-900">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </a>
                        <div className="flexliving-logo" style={{ color: "#3D4A3B" }}>
                            <span style={{ color: "#B4E051" }}>F</span>LEXLIVING
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">👋 Bonjour Ryan</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Property Title and General Information */}
                <div className="mb-6">
                    <h1 className="property-title mb-2">{listing.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-sm">{listing.address}</span>
                    </div>
                    <div className="mt-2 inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                        {listing.squareMeters ? `${listing.squareMeters} m²` : "Property details"}
                    </div>
                </div>

                {/* Image Gallery */}
                {sortedImages.length > 0 ? (
                    <div className="mb-8 relative">
                        <div className="image-grid">
                            {/* Main Image */}
                            <div className="image-container">
                                {mainImage && (
                                    <img
                                        src={mainImage.url}
                                        alt={mainImage.caption || "Main property image"}
                                    />
                                )}
                            </div>

                            {/* Right side images */}
                            <div className="image-grid-right">
                                {additionalImages[0] && (
                                    <div className="image-container">
                                        <img
                                            src={additionalImages[0].url}
                                            alt={additionalImages[0].caption || "Property image"}
                                        />
                                    </div>
                                )}

                                {additionalImages.length > 1 && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {additionalImages.slice(1, 3).map((image) => (
                                            <div key={image.id} className="image-container">
                                                <img
                                                    src={image.url}
                                                    alt={image.caption || "Property image"}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* See Location Button */}
                        <button className="voir-emplacement-btn">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Voir l'emplacement
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                </svg>
                                <span className="font-semibold">{listing.bedroomsNumber || 1}</span>
                            </div>
                            <div className="w-px h-6 bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <span className="font-semibold">{listing.personCapacity}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 bg-gray-100 h-96 rounded flex items-center justify-center">
                        <p className="text-gray-500">No images available</p>
                    </div>
                )}
            </div>
        </>
    );
}
