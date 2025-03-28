import { useState } from "react";
import Navbar from "../components/Admin/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([
    {
      "id": 1,
      "title": "Sony WH-1000XM5 Headphones",
      "category": "Electronics",
      "brand": "Sony",
      "description": "These are one of the best noise-canceling headphones available on the market. Comfortable and great for long listening sessions.",
      "rating": 5,
      "timeUsed": "3 months",
      "pros": "Excellent noise cancellation, superb sound quality, very comfortable",
      "cons": "Expensive, the sound can be bass-heavy for some users",
      "recommend": true,
      "suggestions": "A more balanced sound profile would be ideal.",
      "submittedAt": "2024-02-01",
      "status": "marked for review"
    },
    {
      "id": 2,
      "titleß": "Apple iPhone 15 Pro Max",
      "category": "Smartphones",
      "brand": "Apple",
      "description": "The iPhone 15 Pro Max offers incredible performance and great camera capabilities. However, it comes with a high price tag.",
      "rating": 4,
      "timeUsed": "6 months",
      "pros": "Powerful performance, amazing camera, beautiful display",
      "cons": "Extremely expensive, no major design changes from previous models",
      "recommend": true,
      "suggestions": "A lower price would make it a better value.",
      "submittedAt": "2024-03-10",
      "status": "marked for review"
    },
    {
      "id": 3,
      "title": "Google Pixel 8",
      "category": "Smartphones",
      "brand": "Google",
      "description": "A solid all-around device with excellent camera performance but lacks some of the features found in flagship competitors.",
      "rating": 3,
      "timeUsed": "4 months",
      "pros": "Stock Android experience, amazing camera for photos, good performance",
      "cons": "Lacks high-end hardware features, battery life could be better",
      "recommend": false,
      "suggestions": "Improve battery life and add more premium features.",
      "submittedAt": "2024-03-15",
      "status": "marked for review"
    },
    {
      "id": 4,
      "title": "Samsung QLED TV 55\"",
      "category": "Electronics",
      "brand": "Samsung",
      "description": "Great picture quality and smart features, but the audio is not up to the mark.",
      "rating": 4,
      "timeUsed": "1 year",
      "pros": "Excellent picture quality, smooth interface",
      "cons": "Sound quality could be better, expensive",
      "recommend": true,
      "suggestions": "Better sound quality or built-in sound system would improve the experience.",
      "submittedAt": "2024-01-20",
      "status": "marked for review"
    },
    {
      "id": 5,
      "title": "Bose SoundLink Revolve+ Bluetooth Speaker",
      "category": "Electronics",
      "brand": "Bose",
      "description": "The speaker has clear sound and excellent bass for its size, but the battery life could be better.",
      "rating": 4,
      "timeUsed": "5 months",
      "pros": "Clear sound, deep bass, portable",
      "cons": "Battery life not as long as expected",
      "recommend": true,
      "suggestions": "Improved battery life would make it perfect.",
      "submittedAt": "2024-02-10",
      "status": "marked for review"
    }
  ]
  );

  const handleReviewAction = (reviewId, action) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: action === "accept" ? "accepted" : "rejected",
            }
          : review
      )
    );

    if (action === "accept") {
      toast.success("Review accepted!");
    } else {
      toast.error("Review rejected!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Manage Reviews</h2>
        <div className="grid grid-cols-1 gap-6">
          {reviews
            .filter((review) => review.status === "marked for review")
            .map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-gray-800">{review.title}</h3>
                <p className="text-sm text-gray-600">{review.category} - {review.brand}</p>
                <p className="mt-2 text-gray-700">{review.description}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="font-medium">Rating: {review.rating} ★</p>
                    <p className="text-sm text-gray-500">Used for: {review.timeUsed}</p>
                    <p className="text-sm text-gray-500">Submitted on: {review.submittedAt}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleReviewAction(review.id, "accept")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition-all"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReviewAction(review.id, "reject")}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Full Review Details */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">Pros:</h4>
                  <p className="text-gray-700">{review.pros}</p>
                  <h4 className="font-semibold text-gray-800 mt-4">Cons:</h4>
                  <p className="text-gray-700">{review.cons}</p>
                  <h4 className="font-semibold text-gray-800 mt-4">Suggestions:</h4>
                  <p className="text-gray-700">{review.suggestions}</p>
                  <h4 className="font-semibold text-gray-800 mt-4">Recommend?</h4>
                  <p className="text-gray-700">{review.recommend ? "Yes" : "No"}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
