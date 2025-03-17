import { useState } from "react";
import Navbar from "../components/User/Navbar";
import BackButton from "../components/User/BackButton";
import Review from "../components/User/Review";

export default function MyEarnings() {
  const [reviewsSubmitted, setReviewsSubmitted] = useState(50);
  const [earningsPerReview, setEarnignsPerReview] = useState(1.2);
  const [claimedEarnings, setClaimedEarnings] = useState(30);
  
  const totalEarnings = reviewsSubmitted * earningsPerReview;
  const claimableBalance = totalEarnings - claimedEarnings;

  return (
    <>
    <Navbar />
    
    <div className="mx-auto p-5">
    <BackButton />  

    </div>

    <div className="max-w-2xl mx-auto text-gray-900">


        {/* Header  */}
      <h1 className="text-5xl font-bold text-center mb-10">My Earnings</h1>
      
      {/* Reviews submitted count  */}
      <div className="grid gap-6 text-2xl">
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Reviews Submitted</span>
          <span>{reviewsSubmitted}</span>
        </div>

        {/* Earnings per review  */}
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Earnings per Review</span>
          <span>${earningsPerReview.toFixed(2)}</span>
        </div>

        {/* Total earnings  */}
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Total Earnings</span>
          <span>${totalEarnings.toFixed(2)}</span>
        </div>

        {/* Claimed  */}
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Claimed Earnings</span>
          <span>${claimedEarnings.toFixed(2)}</span>
        </div>

        {/* Claimable  */}
        <div className="flex justify-between font-semibold text-4xl ">
          <span>Claimable Balance</span>
          <span className="text-green-600">${claimableBalance.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Button to claim earnings  */}
      <div className="mt-10 text-center">
        <button 
          className="w-full py-4 text-2xl font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          disabled={claimableBalance <= 0}
        >
          Claim Earnings
        </button>
      </div>
    </div>

    
    </>
  );
}
