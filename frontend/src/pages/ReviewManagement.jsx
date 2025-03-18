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

  // Admin should be able to change cost per review
  const [costPerReview, setCostPerReview] = useState(1.5); // Default cost per review

  const purchasedReviews = reviews.filter((review) => review.purchased);
  const unpurchasedReviews = reviews.filter((review) => !review.purchased);

  const purchasedCount = purchasedReviews.length;
  const unpurchasedCount = unpurchasedReviews.length;

  const totalPurchasedCost = purchasedCount * costPerReview;
  const totalUnpurchasedCost = unpurchasedCount * costPerReview;

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchasedReviews);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reviews");
    XLSX.writeFile(workbook, "reviews.xlsx");
  };

  return (
    <>
      <Navbar />
      <div className="pt-20">
      <div className="p-5 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Review Management</h1>
        <p className="mb-2">Purchased Reviews: {purchasedCount}</p>
        <p className="mb-2">Cost per Review: ${costPerReview.toFixed(2)}</p>
        <p className="mb-4">Total Cost of Purchased Reviews: ${totalPurchasedCost.toFixed(2)}</p>
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download Reviews
        </button>
      </div>
      </div>

      <div className="pt-20">
      <div className="p-5 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Purchase more Reviews</h1>
        <p className="mb-2">Un-Purchased Reviews: {unpurchasedCount}</p>
        <p className="mb-2">Cost per Review: ${costPerReview.toFixed(2)}</p>
        <p className="mb-4">Total Cost of Un-Purchased Reviews: ${totalUnpurchasedCost.toFixed(2)}</p>
        <button
        //   onClick={ // RAZORPAY CALLED HERE}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Buy Reviews
        </button>
      </div>
      </div>
    </>
  );
}
