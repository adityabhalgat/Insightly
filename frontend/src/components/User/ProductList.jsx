import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import SearchBar from "./SearchBar";

// Curated product images using local files from the public folder
const curatedProductImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
];

// Predefine prices based on images
const imagePriceMap = {
  "/1.jpg": 999.99,
  "/2.jpg": 1999.49,
  "/3.jpg": 199.99,
  "/4.jpg": 2499.99,
  "/5.jpg": 2999.99,
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  // Shuffle the curated images once on component mount
  useEffect(() => {
    const shuffleImages = [...curatedProductImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffleImages);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        const response = await axios.get("http://localhost:5001/api/products/getall", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prd) =>
    (selected === "All" || prd.category === selected) &&
    prd.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading)
    return <p className="text-blue-500 text-center">Loading products...</p>;
  if (error)
    return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-12">
      {/* Search Bar */}
      <div className="pt-20 flex justify-center">
        <SearchBar setQuery={setQuery} selected={selected} setSelected={setSelected} />
      </div>
      {/* Product Grid */}
      <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prd, index) => {
            const assignedImage = shuffledImages[index] || shuffledImages[0];
            const assignedPrice = imagePriceMap[assignedImage] || 999.99; // Default price if missing

            return (
              <Product
                key={prd._id}
                id={prd._id}
                name={prd.name}
                category={prd.category}
                brand={prd.brand}
                description={prd.description}
                price={assignedPrice}
                imageUrl={assignedImage}
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
