import { useNavigate } from "react-router-dom";
import AddProduct from "../components/Company/AddProduct";
import Navbar from "../components/Company/Navbar";
import ProductList from "../components/Company/ProductList";

export default function ProductManagement() {

  const navigate = useNavigate();

  function handlesubmit() {
    navigate("/addproduct");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 px-8 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">🛒 Product Management</h1>

          {/* Add Product Button */}
          <div className="w-full flex justify-center mb-8">
            <button
              onClick={handlesubmit}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out text-lg"
            >
              ➕ Add New Product
            </button>
          </div>

          {/* Product Grid */}
          <ProductList />

        </div>
      </div>
    </>
  );
}
