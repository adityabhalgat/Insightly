import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ setQuery, selected, setSelected }) {
  const categories = [
    "All",
    "Smartphones",
    "Laptops",
    "Headphones",
    "Earbuds",
    "Televisions",
    "Gaming Consoles",
    "Smartwatches",
  ];

  return (
    <div className="flex gap-6 items-center rounded-lg p-4 w-full max-w-3xl">
      {/* Category Dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="bg-white border border-gray-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-white border border-gray-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
