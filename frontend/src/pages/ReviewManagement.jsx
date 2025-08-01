import { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../components/Company/Navbar";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:5001`;

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  // Function to mark all unpurchased reviews as purchased
  const buyReviews = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay. Please check your internet connection and try again.");
      return;
    }
  
    const totalAmount = unpurchasedCount * costPerReview * 100; // Convert to paise
  
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount: totalAmount,
        currency: "INR",
      });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Changed from process.env to import.meta.env
        amount: totalAmount,
        currency: "INR",
        name: "Product Review Purchase",
        description: `Purchasing ${unpurchasedCount} reviews`,
        order_id: data.id,
        handler: async function (response) {
          if (response.razorpay_payment_id && response.razorpay_signature) {
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
              razorpay_order_id: data.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (verifyRes.data.success) {
              const updatedReviews = reviews.map((review) =>
                review.purchased ? review : { ...review, purchased: true }
              );
              setReviews(updatedReviews);
              alert("Payment successful! Reviews have been purchased.");
            } else {
              alert("Payment verification failed.");
            }
          } else {
            alert("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: "Your Name",
          email: "your@email.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment processing failed. Try again.");
    }
  };
  
  const downloadExcel = () => {
    const formattedData = purchasedReviews.map((review) => ({
      "Product Name": review.title,
      "Category": review.category,
      "Brand": review.brand,
      "Description": review.description,
      "Rating": review.rating,
      "Time Used": review.timeUsed,
      "Pros": review.pros,
      "Cons": review.cons,
      "Recommend": review.recommend ? "Yes" : "No",
      "Submitted On": review.submittedAt,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
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
