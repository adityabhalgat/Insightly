import { useState } from "react";


// eslint-disable-next-line react/prop-types
export default function SearchBar( { setQuery, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["All", "Articles", "Images", "Videos", "News", "Smartphones"];


  return (
    <div className="flex items-center space-x-2 w-full max-w-md">
      <div className="relative">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2 border border-gray-300 cursor-pointer bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected} <span className="w-4 h-4">▼</span>
        </div>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
            {categories.map((category) => (
              <div
                key={category}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelected(category);
                  setIsOpen(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 px-4 py-2 rounded-full border border-gray-300 bg-white">
        <input
          className="w-full outline-none bg-white"
          placeholder="Search..."
          //value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
