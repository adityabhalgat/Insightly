import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/User/Navbar";
import BackButton from "../components/User/BackButton";

export default function WriteReview() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // Hook for redirection

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [productSequenceNumber, setProductSequenceNumber] = useState("");
  const [reviewPrice, setReviewPrice] = useState(50);
  const [suggestions, setSuggestions] = useState("");

  // Fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/get/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!review.trim()) {
      alert("Review cannot be empty!");
      return;
    }

    const reviewData = {
      productId: id,
      rating: parseFloat(rating), // Ensuring it’s a number
      usageDuration,
      pros,
      cons,
      recommend,
      review,
      productSequenceNumber,
      reviewPrice,
      suggestions,
    };

    try {
      const response = await axios.post("http://localhost:5001/api/reviews", reviewData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Review submitted successfully!");
        // Reset state
        setRating(0);
        setReview("");
        setUsageDuration("");
        setPros("");
        setCons("");
        setRecommend(null);
        setProductSequenceNumber("");
        setSuggestions("");
        setReviewPrice(50);
        navigate("/user"); // Redirect
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <BackButton />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Write a Review</h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading product details...</p>
          ) : product ? (
            <>
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">Description: {product.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 shadow-lg rounded-lg">
                <div>
                  <label className="block text-sm font-medium">Product Sequence Number</label>
                  <input
                    type="text"
                    value={productSequenceNumber}
                    onChange={(e) => setProductSequenceNumber(e.target.value)}
                    placeholder="Enter sequence number from product"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          rating >= star ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">How long have you used this product?</label>
                  <input
                    type="text"
                    value={usageDuration}
                    onChange={(e) => setUsageDuration(e.target.value)}
                    placeholder="e.g., 1 month, 6 months, 1 year"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Review</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Pros</label>
                  <textarea
                    value={pros}
                    onChange={(e) => setPros(e.target.value)}
                    placeholder="What do you like about this product?"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Cons</label>
                  <textarea
                    value={cons}
                    onChange={(e) => setCons(e.target.value)}
                    placeholder="What do you dislike about this product?"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Would you recommend this product?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRecommend(true)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        recommend === true ? "bg-green-500 text-white scale-110 shadow-md" : "bg-gray-200 text-gray-700 hover:bg-green-300"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommend(false)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        recommend === false ? "bg-red-500 text-white scale-110 shadow-md" : "bg-gray-200 text-gray-700 hover:bg-red-300"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Suggestions</label>
                  <textarea
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="Suggestions to improve the product!"
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
                  Submit Review
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-red-500">Product not found.</p>
          )}
        </div>
      </div>
    </>
  );
}
