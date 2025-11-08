import { listingService } from "@/app/services/ListingService";
import { reviewService } from "@/app/services/ReviewService";

export default async function PropertyDetail({ params }: { params: { id: string } }) {
    const listing = await listingService.fetchListingById(params.id);
    if (!listing) {
        return <div>Listing not found</div>;
    }

    const reviews = await reviewService.fetchReviewsByListingId(params.id); // 'false' will return all reviews including unpublished ones
    // Display json
    return (
      <>
        <div>
          <h1>{listing.name}</h1>
          {/*<pre>{JSON.stringify(listing, null, 2)}</pre>*/}
        </div>
        {/* The address */}
        <div>
          <h2>Address</h2>
          <p>{listing.address}</p>
        </div>
        {/* The reviews */}
        <div>
          <h2>Reviews</h2>
          {reviews ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>{review.publicReview}</li>
              ))}
            </ul>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </>
    );
}
