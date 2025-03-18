/* eslint-disable react/prop-types */
export default function AddProduct({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
      >
        + Add Product
      </button>
    );
  }
  