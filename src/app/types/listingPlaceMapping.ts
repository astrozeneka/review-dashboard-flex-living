export interface ListingPlaceMapping {
  id: number
  listingId: number
  googlePlaceId: string
  listingName?: string|null
  placeName?: string|null
  createdAt: Date
  updatedAt: Date
}