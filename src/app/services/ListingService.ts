import { prisma } from "@/lib/prisma";
import { Property } from "../types/property";


const HOSTAWAY_API_BASE = process.env.HOSTAWAY_API_BASE;
const HOSTAWAY_API_KEY = process.env.HOSTAWAY_API_KEY;


class ListingService {
    /**
     * Fetch all listings from the database.
     * @returns  A promise that resolves to an array of Property objects.
     */
    async fetchListings(): Promise<Property[]> {
        const listings: Property[] = await prisma.property.findMany();
        return listings;
    }

    /**
     * Fetch a single listing by its ID.
     * @param id - The ID of the listing to fetch.
     * @returns A promise that resolves to the Property object if found, or null if not found.
     */
    async fetchListingById(id: string): Promise<Property | null> {

        // use the hostaway API to fetch the listing by ID
        const response = await fetch(`${HOSTAWAY_API_BASE}/listings/${id}`, {
            headers: {
                'Authorization': `Bearer ${HOSTAWAY_API_KEY}`
            }
        });
        const listing = await response.json();
        return listing.result as Property;
    }
}

// Singleton instance
export const listingService = new ListingService();