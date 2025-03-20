import { useState } from "react";
import BackButton from "../components/User/BackButton";
import Navbar from "../components/User/Navbar";
import Review from "../components/User/Review";

export default function MyReviews() {
  const [reviews] = useState([
    {
      _id: "1",
      title: "Excellent Laptop!",
      category: "Electronics",
      brand: "Brand X",
      rating: 5,
      status: "accepted",
      description: "Great performance and battery life!",
      timeUsed: "6 months",
      pros: "Fast, lightweight, great display",
      cons: "A bit expensive",
      recommend: true,
      suggestions: "Improve the keyboard feel",
      submittedAt: "2024-03-01T12:00:00Z",
    },
    {
      _id: "2",
      title: "Decent Smartphone",
      category: "Mobile Phones",
      brand: "Brand Y",
      rating: 3,
      status: "marked for review",
      description: "Decent phone but the camera is underwhelming.",
      timeUsed: "1 year",
      pros: "Good battery, smooth UI",
      cons: "Poor camera quality",
      recommend: false,
      suggestions: "Upgrade the camera module",
      submittedAt: "2024-02-15T10:30:00Z",
    },
    {
      _id: "3",
      title: "Amazing Headphones",
      category: "Audio",
      brand: "Brand Z",
      rating: 5,
      status: "accepted",
      description: "Amazing sound quality and comfort!",
      timeUsed: "2 years",
      pros: "Crystal clear sound, long battery life",
      cons: "None so far",
      recommend: true,
      suggestions: "Add more color options",
      submittedAt: "2024-01-20T08:45:00Z",
    },
  ]);

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
      <Navbar />
      <div className="mx-auto p-5">
        <BackButton />
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}