import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/User/Navbar";
import BackButton from "../components/User/BackButton";

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:5001`;
export default function MyEarnings() {
  const [reviewsSubmitted, setReviewsSubmitted] = useState(0);
  const [earningsPerReview, setEarningsPerReview] = useState(0);
  const [claimedEarnings, setClaimedEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

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

        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReviewsSubmitted(response.data.totalReviewsWritten || 0);
        setEarningsPerReview(response.data.totalEarnings / (response.data.totalReviewsWritten || 1)); 
        setClaimedEarnings(response.data.claimedEarnings || 0);
      } catch (err) {
        setError("Failed to load earnings data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 min-h-screen">
      <Navbar />
      <div className="mx-auto p-5">
        <BackButton />
      </div>

      <div className="max-w-2xl mx-auto text-gray-900 ">
        <h1 className="text-5xl font-bold text-center mb-10">My Earnings</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
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

            {/* Redirect to Claim Earnings Page */}
            <div className="mt-10 text-center">
              <button
                className="w-full py-4 text-2xl font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={claimableBalance <= 0}
                onClick={() => navigate("/claim-earnings", { state: { claimableBalance } })}
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
