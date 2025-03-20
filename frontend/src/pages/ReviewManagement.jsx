import { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../components/Company/Navbar";

const initialReviews = [
  {
    id: 3,
    title: "Dyson V11 Vacuum Cleaner",
    category: "Appliances",
    brand: "Dyson",
    description: "Overpriced vacuum cleaner with mediocre performance.",
    rating: 2,
    timeUsed: "3 months",
    pros: "Stylish design, lightweight",
    cons: "Weak suction, overpriced",
    recommend: false,
    suggestions: "Improve suction power and lower price.",
    submittedAt: "2024-05-22",
    status: "rejected",
    purchased: false,
    downloaded: false,
  },
  {
    id: 4,
    title: "iPhone 15 Pro",
    category: "Electronics",
    brand: "Apple",
    description: "Great phone, but too expensive.",
    rating: 4,
    timeUsed: "2 months",
    pros: "Excellent camera, smooth performance",
    cons: "Battery life could be better, very expensive",
    recommend: true,
    suggestions: "Reduce the price, improve battery life.",
    submittedAt: "2024-06-10",
    status: "approved",
    purchased: false,
    downloaded: false,
  },
  {
    id: 5,
    title: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    brand: "Samsung",
    description: "A powerful phone with great features.",
    rating: 5,
    timeUsed: "1 month",
    pros: "Amazing display, great battery life",
    cons: "Expensive",
    recommend: true,
    suggestions: "Make it more affordable.",
    submittedAt: "2024-07-05",
    status: "approved",
    purchased: true,
    downloaded: false,
  },
  {
    id: 6,
    title: "Bose QuietComfort Earbuds",
    category: "Audio",
    brand: "Bose",
    description: "Excellent noise-canceling earbuds.",
    rating: 5,
    timeUsed: "4 months",
    pros: "Superb sound, comfortable fit",
    cons: "Bulky case",
    recommend: true,
    suggestions: "Make the case more compact.",
    submittedAt: "2024-06-22",
    status: "approved",
    purchased: false,
    downloaded: false,
  },
];

export default function ReviewManagement() {
  const [reviews, setReviews] = useState(initialReviews);
  const [costPerReview, setCostPerReview] = useState(1.5);

  const purchasedReviews = reviews.filter((review) => review.purchased);
  const unpurchasedReviews = reviews.filter((review) => !review.purchased);

  const purchasedCount = purchasedReviews.length;
  const unpurchasedCount = unpurchasedReviews.length;

  const totalPurchasedCost = purchasedCount * costPerReview;
  const totalUnpurchasedCost = unpurchasedCount * costPerReview;

  // Function to mark all unpurchased reviews as purchased
  const buyReviews = () => {
    const updatedReviews = reviews.map((review) =>
      review.purchased ? review : { ...review, purchased: true }
    );
    setReviews(updatedReviews);
  };

  // Function to download purchased reviews as an Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchasedReviews);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchased Reviews");
    XLSX.writeFile(workbook, "purchased_reviews.xlsx");
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-100 to-indigo-300">
        {/* Purchased Reviews Section */}
        <div className="p-8 w-full max-w-3xl bg-white rounded-lg shadow-xl mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Review Management</h1>
          <div className="text-gray-700 mb-3">
            <strong>Purchased Reviews:</strong> {purchasedCount}
          </div>
          <div className="text-gray-700 mb-3">
            <strong>Cost per Review:</strong> ${costPerReview.toFixed(2)}
          </div>
          <div className="text-gray-700 mb-6">
            <strong>Total Cost of Purchased Reviews:</strong> ${totalPurchasedCost.toFixed(2)}
          </div>
          <button
            onClick={downloadExcel}
            className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            📥 Download Purchased Reviews
          </button>
        </div>

        {/* Unpurchased Reviews Section */}
        <div className="p-8 w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Purchase More Reviews</h1>
          <div className="text-gray-700 mb-3">
            <strong>Unpurchased Reviews:</strong> {unpurchasedCount}
          </div>
          <div className="text-gray-700 mb-3">
            <strong>Cost per Review:</strong> ${costPerReview.toFixed(2)}
          </div>
          <div className="text-gray-700 mb-6">
            <strong>Total Cost of Unpurchased Reviews:</strong> ${totalUnpurchasedCost.toFixed(2)}
          </div>
          <button
            onClick={buyReviews}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            💳 Buy Reviews
          </button>
        </div>
      </div>
    </>
  );
}
