export interface PropertyApiResponse {
  status: string
  result: Property
}

export interface Property {
  id: number
  propertyTypeId: number
  name: string
  externalListingName: string
  internalListingName: string
  description: string
  thumbnailUrl: any
  houseRules: string
  keyPickup: any
  specialInstruction: any
  doorSecurityCode: any
  country: string
  countryCode: string
  state: string
  city: string
  street: string
  address: string
  publicAddress: string
  zipcode: string
  price: number
  starRating: any
  weeklyDiscount: number
  monthlyDiscount: number
  propertyRentTax: number
  guestPerPersonPerNightTax: number
  guestStayTax: number
  guestNightlyTax: number
  refundableDamageDeposit: number
  isDepositStayCollected: number
  personCapacity: number
  maxChildrenAllowed: any
  maxInfantsAllowed: any
  maxPetsAllowed: any
  lat: number
  lng: number
  checkInTimeStart: number
  checkInTimeEnd: number
  checkOutTime: number
  cancellationPolicy: string
  squareMeters: any
  roomType: string
  bathroomType: string
  bedroomsNumber: number
  bedsNumber: number
  bathroomsNumber: number
  guestBathroomsNumber: any
  minNights: number
  maxNights: number
  guestsIncluded: number
  cleaningFee: number
  checkinFee: number
  priceForExtraPerson: number
  instantBookable: number
  instantBookableLeadTime: any
  airbnbBookingLeadTime: any
  airbnbBookingLeadTimeAllowRequestToBook: any
  airbnbName: string
  airbnbSummary: any
  airbnbSpace: any
  airbnbAccess: any
  airbnbInteraction: any
  airbnbNeighborhoodOverview: any
  airbnbTransit: any
  airbnbNotes: any
  airbnbExportStatus: any
  vrboExportStatus: any
  marriotExportStatus: any
  bookingcomExportStatus: any
  expediaExportStatus: any
  googleExportStatus: any
  allowSameDayBooking: number
  sameDayBookingLeadTime: number
  contactName: string
  contactSurName: string
  contactPhone1: string
  contactPhone2: any
  contactLanguage: string
  contactEmail: string
  contactAddress: any
  language: string
  currencyCode: string
  timeZoneName: string
  wifiUsername: any
  wifiPassword: any
  cleannessStatus: string
  cleaningInstruction: any
  cleannessStatusUpdatedOn: any
  homeawayPropertyName: string
  homeawayPropertyHeadline: string
  homeawayPropertyDescription: string
  bookingcomPropertyName: string
  bookingcomPropertyRoomName: string
  bookingcomPropertyDescription: string
  invoicingContactName: any
  invoicingContactSurName: any
  invoicingContactPhone1: any
  invoicingContactPhone2: any
  invoicingContactLanguage: any
  invoicingContactEmail: any
  invoicingContactAddress: any
  invoicingContactCity: any
  invoicingContactZipcode: any
  invoicingContactCountry: any
  attachment: any
  listingAmenities: ListingAmenity[]
  listingBedTypes: ListingBedType[]
  listingImages: ListingImage[]
  listingTags: ListingTag[]
  listingUnits: any[]
  propertyLicenseNumber: any
  propertyLicenseType: any
  propertyLicenseIssueDate: any
  propertyLicenseExpirationDate: any
  customFieldValues: CustomFieldValue[]
  applyPropertyRentTaxToFees: any
  bookingEngineLeadTime: any
  cancellationPolicyId: number
  vrboCancellationPolicyId: number
  marriottCancellationPolicyId: number
  bookingCancellationPolicyId: number
  listingFeeSetting: any[]
  isRentalAgreementActive: any
  averageNightlyPrice: any
  bookingcomPropertyRegisteredInVcs: any
  bookingcomPropertyHasVat: any
  bookingcomPropertyDeclaresRevenue: any
  airbnbCancellationPolicyId: number
  airbnbListingUrl: any
  vrboListingUrl: any
  googleVrListingUrl: any
  expediaListingUrl: any
  averageReviewRating: any
  partnersListingMarkup: number
  airbnbOfficialListingMarkup: number
  bookingEngineMarkup: number
  homeawayApiMarkup: number
  marriottListingMarkup: number
  latestActivityOn: string
  bookingEngineUrls: any[]
  marriottListingName: any
  airbnbPetFeeAmount: any
  insertedOn: string
  insuranceEligibilityStatus: any
  listingSettings: ListingSettings
}

export interface ListingAmenity {
  id: number
  amenityId: number
  amenityName: string
}

export interface ListingBedType {
  id: number
  bedTypeId: number
  quantity: number
  bedroomNumber: number
}

export interface ListingImage {
  id: number
  caption: string
  bookingEngineCaption: any
  airbnbCaption: any
  vrboCaption: any
  url: string
  sortOrder: number
}

export interface ListingTag {
  id: number
  name: string
}

export interface CustomFieldValue {
  id: number
  customFieldId: number
  value?: string
  insertedOn: string
  updatedOn: string
  customField: CustomField
}

export interface CustomField {
  id: number
  name: string
  possibleValues?: PossibleValue[]
  type: string
  isPublic: number
  insertedOn: string
  updatedOn: string
}

export interface PossibleValue {
  value: string
}

export interface ListingSettings {
  id: number
  accountId: number
  listingMapId: number
  showInvoices: number
  showInvoicesStage: string
  showInvoicesChannels: any
  showReceipts: number
  minimumNightsThresholdToApplyMonthlyDiscount: number
  showPaymentLinkForAwaitingPayments: number
  showPaymentLinkForFailedPayments: number
  insertedOn: string
  updatedOn: string
}
