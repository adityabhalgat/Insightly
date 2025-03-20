import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ id, name, category, brand, description, price, imageUrl }) {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/writeareview/${id}`);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-1 capitalize">
          {category} {brand && `| ${brand}`}
        </p>
        <p className="text-lg font-semibold text-blue-600 mt-2">₹{price}</p>
        <p className="text-gray-600 text-sm mt-3 line-clamp-2">{description}</p>
        <button
          onClick={handleReviewClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Give Review
        </button>
      </div>
    </div>
  );
}
