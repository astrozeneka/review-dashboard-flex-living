export interface Review {
  id: number
  hostawayId: number|null
  type: string
  rating: number|null
  publicReview: string
  reviewCategory: ReviewCategory[] | null
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

export interface ReviewStatistics {
  lastThreeMonthsAverage: number
  previousThreeMonthsAverage: number
  overallAverage: number
  count: number
  starCount: StarCount
}

export interface StarCount {
  "2": number
  "4": number
  "6": number
  "8": number
  "10": number
}
