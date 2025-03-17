/* eslint-disable react/prop-types */

export default function Product({ name, category, brand, description, productid }) {
    return (
      <div className="relative max-w-md mx-auto p-6 rounded-2xl shadow-xl bg-black text-white z-10">
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-indigo-500 opacity-30 blur-lg rounded-2xl -z-10"></div>
  
        {/* Card Content */}
        <div className="relative">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm opacity-80 mt-1">{category}</p>
          <p className="text-xl font-semibold mt-5">{brand}</p>
          <p className="text-gray-300 text-lg mt-3">{description}</p>
          <br />
          <a href={`/writeareview/${productid}`}>
          <button className="mt-4 py-2 px-4 text-white font-semibold text-lg rounded-lg bg-gradient-to-r from-green-400 to-indigo-500 hover:from-indigo-500 hover:to-green-400 transition-all duration-300 shadow-lg shadow-indigo-500/50 hover:shadow-green-400/50">
            Write a Review
          </button>
          </a>

        </div>
      </div>
    );
  }
  