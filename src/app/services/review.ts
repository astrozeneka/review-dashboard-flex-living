export interface Review {
  id: number
  hostawayId: number|null
  type: string
  rating: number|null
  publicReview: string
  reviewCategory: ReviewCategory[]
  submittedAt: string
  guestName: string
  listingName: string
  listingId: number
  channel: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewCategory {
  category: string
  rating: number
}
