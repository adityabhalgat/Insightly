import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fix here
import BackButton from "../components/User/BackButton";
import Navbar from "../components/User/Navbar";
import Review from "../components/User/Review";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token); // Fix applied
        console.log("Decoded Token:", decodedToken); // Debugging

        const userId = decodedToken.id;
        if (!userId) {
          console.error("User ID not found in token.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/api/reviews/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
      <Navbar />
      <div className="mx-auto p-5">
        <BackButton />
      </div>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review._id}
            review={{
              _id: review._id,
              title: review.productId.name,
              category: review.productId.description,
              brand: "Unknown",
              rating: review.rating,
              status: review.status,
              description: review.review,
              timeUsed: review.usageDuration,
              pros: review.pros,
              cons: review.cons,
              recommend: review.recommend,
              suggestions: review.suggestions,
              submittedAt: review.createdAt,
            }}
          />
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
