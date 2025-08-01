import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Retrieved Token:", token);

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.get(`${API_BASE_URL}/api/products/getbycompany`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📌 Products fetched:", response.data); // Debugging
        setProducts(response.data);
      } catch (err) {
        console.error("❌ Fetch Products Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log("🛠️ handleDelete received ID:", id); // Debugging

    if (!id) {
      alert("❌ Error: Product ID is undefined!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No authentication token found.");
        alert("Please log in again.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Product deleted successfully");
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("❌ Error deleting product:", error.response?.data || error.message);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {products.length > 0 ? (
        products.map((prd) => (
          <Product key={prd._id} product={prd} onDelete={() => handleDelete(prd._id)} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
