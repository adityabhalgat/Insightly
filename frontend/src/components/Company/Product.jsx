/* eslint-disable react/prop-types */
export default function Product({ product, onDelete }) {
    return (
      <div className="relative w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-900 truncate">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
        <p className="mt-3 text-gray-700 text-sm line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-yellow-500">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.75l-6.16 3.94 1.6-7.02-5.44-4.72 7.16-.61L12 2.25l2.84 6.39 7.16.61-5.44 4.72 1.6 7.02z" />
            </svg>
            <span className="text-lg font-semibold">{product.avgRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm">{product.reviewCount} reviews</span>
        </div>
        <p className="mt-4 text-gray-500 text-xs font-medium">Brand: {product.brand}</p>
        
        {/* Delete Button */}
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    );
}