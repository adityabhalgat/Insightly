import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/User/Navbar";
import BackButton from "../components/User/BackButton";

export default function MyEarnings() {
  const [reviewsSubmitted, setReviewsSubmitted] = useState(0);
  const [earningsPerReview, setEarningsPerReview] = useState(0);
  const [claimedEarnings, setClaimedEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalEarnings = reviewsSubmitted * earningsPerReview;
  const claimableBalance = totalEarnings - claimedEarnings;

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }
  
        const response = await axios.get("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Fetched Data:", response.data); // Debugging log
  
        // Correct field mappings
        setReviewsSubmitted(response.data.totalReviewsWritten || 0);
        setEarningsPerReview(response.data.totalEarnings / (response.data.totalReviewsWritten || 1)); // Avoid division by zero
        setClaimedEarnings(response.data.claimedEarnings || 0);
        
      } catch (err) {
        console.error("Fetch Error:", err.response?.data || err.message);
        setError("Failed to load earnings data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEarnings();
  }, []);
  
  
  
  const handleClaimEarnings = async () => {
    if (claimableBalance <= 0) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5001/api/user/claim-earnings",
        { amount: claimableBalance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Earnings claimed successfully!");

      // Update claimed earnings in the state
      setClaimedEarnings((prev) => prev + claimableBalance);
    } catch (err) {
      alert("Failed to claim earnings. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
      <Navbar />
      <div className="mx-auto p-5">
        <BackButton />
      </div>

      <div className="max-w-2xl mx-auto text-gray-900 ">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-10">My Earnings</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            {/* Earnings Details */}
            <div className="grid gap-6 text-2xl">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Reviews Submitted</span>
                <span>{reviewsSubmitted}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Earnings per Review</span>
                <span>${(earningsPerReview || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Total Earnings</span>
                <span>${(totalEarnings || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Claimed Earnings</span>
                <span>${(claimedEarnings || 0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-4xl">
                <span>Claimable Balance</span>
                <span className="text-green-600">${(claimableBalance || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Claim Earnings Button */}
            <div className="mt-10 text-center">
              <button
                className="w-full py-4 text-2xl font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={claimableBalance <= 0}
                onClick={handleClaimEarnings}
              >
                Claim Earnings
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
