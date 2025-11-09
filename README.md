# Review Dashboard - Flex Living

A comprehensive property review management dashboard built with **Next.js** and **React**, designed to streamline the process of viewing, filtering, and approving guest reviews for rental properties.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features in Detail](#features-in-detail)
  - [Authentication](#authentication)
  - [Dashboard Overview](#dashboard-overview)
  - [Listings Management](#listings-management)
  - [Reviews Management](#reviews-management)
  - [Filtering & Search](#filtering--search)
  - [Review Approval System](#review-approval-system)
- [Components](#components)
- [Data Types & Interfaces](#data-types--interfaces)
- [API Integration](#api-integration)
- [User Interface](#user-interface)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Development](#development)

---

## Overview

The **Review Dashboard** is a modern web application that enables property managers and hosts to efficiently manage guest reviews across multiple rental properties. The dashboard aggregates reviews from various booking channels (Hostaway and other platforms) and provides powerful tools for review moderation, filtering, and approval.

---

## Key Features

✅ **Secure Authentication** - JWT-based login system with token management
✅ **Property Listings View** - Display all properties with ratings and review counts
✅ **Advanced Review Filtering** - Filter by status, property, channel, topic, and rating
✅ **Infinite Scroll Pagination** - Seamless review loading as users scroll
✅ **Review Approval Workflow** - Modal-based interface for reviewing and approving reviews
✅ **Real-time Statistics** - Display review averages, trends, and ratings distribution
✅ **Search Functionality** - Quick search for properties by name or location
✅ **Multi-channel Support** - Aggregate reviews from multiple booking platforms
✅ **Toast Notifications** - User feedback for actions and errors
✅ **Loading States** - Skeleton loaders for better UX during data fetching
✅ **Recurring Issues Detection** - Identify and highlight common review themes

---

## Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive mapping library

### Backend Integration
- **Next.js API Routes** - Backend endpoints for data fetching
- **Prisma** - ORM for database operations
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing and security

### Development Tools
- **ESLint** - Code quality and style enforcement
- **PostCSS** - CSS preprocessing

---

## Project Structure

```
src/
├── app/
│   ├── components/           # Reusable React components
│   │   ├── DetailModal.tsx
│   │   ├── FilterBar.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewApprovalForm.tsx
│   │   ├── ListingRow.tsx
│   │   ├── ListingDetails.tsx
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── PropertyMap.tsx
│   │   ├── StarRating.tsx
│   │   └── *Skeleton.tsx      # Loading placeholders
│   ├── contexts/             # React context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── ApiContext.tsx     # API integration
│   ├── hooks/                # Custom React hooks
│   │   └── useToast.ts       # Toast notification hook
│   ├── types/                # TypeScript interfaces
│   │   ├── review.ts
│   │   ├── property.ts
│   │   └── recurringIssue.ts
│   ├── api/                  # API routes (Next.js)
│   │   ├── listings/
│   │   └── reviews/
│   ├── dashboard/            # Dashboard page
│   ├── login/                # Login page
│   ├── property/             # Property details page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── package.json
└── tsconfig.json
```

---

## Features in Detail

### Authentication

The dashboard uses a **JWT-based authentication system** to secure access.

**Key Features:**
- Login page with credentials validation
- Token storage and management
- Automatic logout functionality
- Protected routes requiring authentication
- Bearer token authorization for API calls

**Location:** `src/app/contexts/AuthContext.tsx`, `src/app/login/page.tsx`

---

### Dashboard Overview

The main dashboard serves as the central hub for property and review management.

**Key Components:**
- **User Greeting** - Displays logged-in user's name
- **Logout Button** - Secure session termination
- **Two Main Sections:**
  1. Listings Management (top)
  2. Reviews Management (bottom)

**Location:** `src/app/dashboard/page.tsx`

---

### Listings Management

A comprehensive table displaying all property listings with key metrics.

**Features:**
- **Property Information Display:**
  - Property name/title
  - Location
  - Average rating (star visualization)
  - Total number of reviews
  - Action buttons

- **Search Functionality:**
  - Real-time property search by name
  - Debounced search for performance
  - Display search results in the same table

- **Interactive Actions:**
  - View detailed listing information in modal
  - Trigger review filters by property
  - Smooth scrolling to reviews section

**Components:**
- `ListingRow.tsx` - Individual listing row display
- `ListingDetails.tsx` - Detailed listing information modal
- `PropertyMap.tsx` - Interactive map view (Leaflet)
- `ListingsLoadingSkeleton.tsx` - Loading state

**Location:** `src/app/dashboard/page.tsx` (lines 310-364)

---

### Reviews Management

A grid-based view of all guest reviews with advanced filtering capabilities.

**Features:**
- **Review Display:**
  - Guest name and rating
  - Review text/content
  - Submission date
  - Listing name
  - Booking channel
  - Publication status (approved/pending)

- **Review Statistics:**
  - Last 3 months average rating
  - Previous 3 months average rating
  - Overall average rating
  - Star distribution (2, 4, 6, 8, 10 star counts)

- **Interactive Features:**
  - Click review to view full details
  - Approve/reject reviews
  - View review categories and topics
  - Recurring issue detection

**Components:**
- `ReviewCard.tsx` - Individual review card display
- `ReviewApprovalForm.tsx` - Review approval/editing interface
- `ReviewsLoadingSkeleton.tsx` - Loading state

**Location:** `src/app/dashboard/page.tsx` (lines 366-402)

---

### Filtering & Search

Powerful filtering system for narrowing down reviews based on various criteria.

**Filter Criteria:**
1. **Status Filter** - View approved, pending, or all reviews
2. **Property Filter** - Filter by specific listing
3. **Channel Filter** - Filter by booking channel (Hostaway, Airbnb, etc.)
4. **Topic Filter** - Filter by review category/topic
5. **Rating Filter** - Filter by minimum star rating (2, 4, 6, 8, 10)
6. **Sorting Options:**
   - Date (newest/oldest first)
   - Rating (highest/lowest first)

**Filter State Management:**
```typescript
{
  status: 'all' | 'approved' | 'pending',
  property: string,
  channel: string,
  topic: string,
  rating: string,
  sort: 'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc'
}
```

**Components:**
- `FilterBar.tsx` - Filter control interface

**Location:** `src/app/components/FilterBar.tsx`

---

### Review Approval System

Streamlined workflow for reviewing and approving guest reviews.

**Features:**
- **Modal Interface:**
  - Display full review details
  - Show review metadata (date, guest, channel)
  - Display review statistics
  - Edit review content if needed

- **Approval Actions:**
  - Approve review for publication
  - Reject/flag review
  - Add notes or comments
  - Update review status

- **Real-time Updates:**
  - Immediately update review list after approval
  - Refresh property ratings
  - Update statistics

**Components:**
- `DetailModal.tsx` - Modal container
- `ReviewApprovalForm.tsx` - Approval form interface

**Location:** `src/app/components/ReviewApprovalForm.tsx`

---

## Components

### Core Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `DetailModal.tsx` | Reusable modal dialog container | `src/app/components/` |
| `FilterBar.tsx` | Review filtering interface | `src/app/components/` |
| `ReviewCard.tsx` | Individual review display card | `src/app/components/` |
| `ListingRow.tsx` | Individual listing table row | `src/app/components/` |
| `StarRating.tsx` | Star rating visualization | `src/app/components/` |
| `Toast.tsx` | Toast notification component | `src/app/components/` |
| `ToastContainer.tsx` | Toast container and manager | `src/app/components/` |

### Specialized Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `ReviewApprovalForm.tsx` | Review approval workflow form | `src/app/components/` |
| `ListingDetails.tsx` | Detailed listing information | `src/app/components/` |
| `PropertyMap.tsx` | Interactive property map | `src/app/components/` |
| `Counter.tsx` | Counter demonstration component | `src/app/components/` |

### Skeleton Loaders (Loading States)

| Component | Purpose | Location |
|-----------|---------|----------|
| `ReviewCardSkeleton.tsx` | Review card loading placeholder | `src/app/components/` |
| `ReviewsLoadingSkeleton.tsx` | Multiple review cards loader | `src/app/components/` |
| `ListingRowSkeleton.tsx` | Listing row loading placeholder | `src/app/components/` |
| `ListingsLoadingSkeleton.tsx` | Multiple listing rows loader | `src/app/components/` |

---

## Data Types & Interfaces

### Review Interface
```typescript
interface Review {
  id: number
  hostawayId: number | null
  type: string
  rating: number | null
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
```

### Review Category Interface
```typescript
interface ReviewCategory {
  category: string
  rating: number
}
```

### Review Statistics Interface
```typescript
interface ReviewStatistics {
  lastThreeMonthsAverage: number
  previousThreeMonthsAverage: number
  overallAverage: number
  count: number
  starCount: StarCount
}
```

### Sorting Criteria Type
```typescript
type SortingCriteria = 'date_asc' | 'date_desc' | 'rating_asc' | 'rating_desc'
```

**Location:** `src/app/types/review.ts`

---

## API Integration

The dashboard communicates with backend APIs through a centralized API context.

### API Endpoints

#### Fetch Hostaway Reviews
```
GET /api/reviews/hostaway?offset=0&limit=20&status=all&channel=all&propertyName=&rating=0&sortingCriteria=date_desc
```
**Parameters:**
- `offset` - Pagination offset
- `limit` - Number of reviews to fetch
- `status` - Filter by status ('all', 'published', 'unpublished')
- `channel` - Filter by channel
- `propertyName` - Filter by property name
- `rating` - Minimum rating filter
- `sortingCriteria` - Sorting order

**Response:**
```json
{
  "status": "success",
  "result": [],
  "hasMore": true
}
```

#### Approve Review
```
POST /api/reviews/hostaway/approve/{reviewId}
Content-Type: application/json
Authorization: Bearer {token}

{ "status": "approved" }
```

**Response:**
```json
{
  "status": "success",
  "message": "Review approved",
  "result": {},
  "listingStats": {}
}
```

#### Fetch Listings
```
GET /api/listings
Authorization: Bearer {token}
```

**Response:**
```json
{
  "listings": []
}
```

#### Fetch Listing Details
```
GET /api/listings/{listingId}
```

**Response:**
```json
{
  "status": "success",
  "result": {},
  "stats": {},
  "recurringIssue": null
}
```

#### Fetch Channels
```
GET /api/reviews/hostaway/channels
```

**Response:**
```json
{
  "channels": []
}
```

### API Context Hook

```typescript
const { fetchHostawayReviews, approveHostawayReview, fetchListingDetailsById } = useApi();
```

**Location:** `src/app/contexts/ApiContext.tsx`

---

## User Interface

### Layout

The dashboard follows a responsive design with:
- **Header Section** - User greeting and logout button
- **Listings Section** - Property management table with search
- **Reviews Section** - Grid of review cards with filters
- **Modals** - Detail views and approval forms
- **Toast Notifications** - User feedback system

### Styling

- **Framework:** Tailwind CSS
- **Responsive Grid System:** Mobile, tablet, and desktop layouts
- **Color Scheme:**
  - Primary: Blue tones
  - Success: Green indicators
  - Warning/Error: Red alerts
  - Neutral: Gray backgrounds

### Loading States

All data-fetching operations display skeleton loaders to improve perceived performance:
- Review card skeletons
- Listing row skeletons
- Smooth skeleton animations

### Toast Notifications

Real-time feedback for user actions:
- Success messages (green)
- Error messages (red)
- Auto-dismiss after 3-5 seconds
- Manual dismiss option

**Location:** `src/app/components/ToastContainer.tsx`, `src/app/hooks/useToast.ts`

---

## Installation & Setup

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Clone the Repository

```bash
git clone https://github.com/your-repo/review-dashboard-flex-living.git
cd review-dashboard-flex-living
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_key
```

### Database Setup (if using Prisma)

```bash
npx prisma generate
npx prisma db push
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Development

### Key Development Practices

1. **TypeScript Strict Mode** - Full type safety enabled
2. **Component Organization** - Modular, reusable components
3. **Custom Hooks** - Encapsulated logic with `useAuth`, `useToast`, `useApi`
4. **Context API** - Centralized state management
5. **Error Handling** - Try-catch blocks and user feedback
6. **Responsive Design** - Mobile-first approach

### File Naming Conventions

- **Components:** PascalCase (e.g., `ReviewCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useToast.ts`)
- **Types:** PascalCase (e.g., `review.ts`)
- **Utilities:** camelCase (e.g., `helpers.ts`)

### Code Style

The project uses ESLint with Next.js recommended rules:

```bash
npm run lint -- --fix
```

---

## Key Hooks

### useAuth()
Provides authentication context including:
- `user` - Current user information
- `token` - JWT access token
- `logout()` - Logout function

**Location:** `src/app/contexts/AuthContext.tsx`

### useApi()
Provides API integration methods:
- `fetchHostawayReviews()` - Fetch reviews with filtering
- `approveHostawayReview()` - Approve a review
- `fetchListingDetailsById()` - Get listing details

**Location:** `src/app/contexts/ApiContext.tsx`

### useToast()
Manages toast notifications:
- `addToast(message, type)` - Show toast
- `removeToast(id)` - Dismiss toast
- `toasts` - Array of active toasts

**Location:** `src/app/hooks/useToast.ts`

---

## Performance Features

✅ **Infinite Scroll Pagination** - Load reviews as users scroll
✅ **Skeleton Loaders** - Improved perceived performance
✅ **Debounced Search** - Prevent excessive API calls
✅ **Memoization** - Component optimization where applicable
✅ **Image Optimization** - Next.js Image component usage
✅ **Code Splitting** - Dynamic imports for large components

---

## Security Features

✅ **JWT Authentication** - Secure token-based auth
✅ **Bearer Token Authorization** - Protected API calls
✅ **Password Hashing** - bcryptjs for password security
✅ **Protected Routes** - Redirect unauthenticated users
✅ **HTTPS Ready** - Production deployment support

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error
```bash
npx prisma generate
```

---

## Future Enhancements

- Email notifications for new reviews
- Export reviews to CSV/PDF
- Advanced analytics dashboard
- Review analytics with charts and graphs
- Bulk review actions
- Custom review templates
- Multi-language support
- Dark mode theme
- Review response functionality
- Guest communication tools

---

## Support & Contribution

For issues, questions, or contributions, please refer to the project repository or contact the development team.

---

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Built with ❤️ for Flex Living**
