import { useState, useEffect } from "react";
import Navbar from "../components/Admin/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMarkedReviews();
  }, []);

  const fetchMarkedReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/reviews/marked-for-review');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching marked reviews:', error);
      toast.error('Failed to load reviews');
    }
  };

  const handleReviewAction = async (reviewId, action) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      await axios.put(
        `http://localhost:5001/api/reviews/${reviewId}`,
        {
          status: action === "accept" ? "accepted" : "rejected"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );

      toast.success(action === "accept" ? "Review accepted!" : "Review rejected!");
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review status');
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
