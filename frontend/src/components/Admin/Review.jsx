import { useState } from "react";

const statusColors = {
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  "marked for review": "bg-yellow-100 text-yellow-700",
};

export default function Review({ id, review }) {
  const [status, setStatus] = useState(review.status || "marked for review");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function handleAccepted() {
    setStatus("accepted");
    //========================
    //UPDATE STATE IN DATABSE;
  }

  function handleRejected() {
    setStatus("rejected");
    //========================
    //UPDATE STATE IN DATABSE;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">{review.title}</h2>
      <p className="text-sm text-gray-500">
        {review.category} · {review.brand}
      </p>

      {/* Rating & Status */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Review Description */}
      <p className="text-sm text-gray-700 mt-3">{review.description}</p>

      {/* Divider */}
      <hr className="my-4 border-gray-200" />

      {/* Details Section */}
      <div className="text-sm space-y-3">
        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Time Used:</span>{" "}
          {review.timeUsed}
        </p>

        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Pros:</span> {review.pros}
        </p>

        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Cons:</span> {review.cons}
        </p>

        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Would Recommend?</span>
          <span
            className={`ml-2 font-semibold ${
              review.recommend ? "text-green-600" : "text-red-600"
            }`}
          >
            {review.recommend ? "Yes" : "No"}
          </span>
        </p>

        <p className="text-gray-500">
          <span className="font-medium text-gray-700">Suggestions:</span>{" "}
          {review.suggestions}
        </p>
      </div>

      {/* Submission Date */}
      <p className="mt-4 text-xs text-gray-400">
        Submitted on: {formatDate(review.submittedAt)}
      </p>

      {/* Accept/Reject Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleAccepted}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={handleRejected}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
