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



      <div className="flex flex-col items-center space-y-6">
        {/* Center-Aligned Button */}
        <div className="w-full flex justify-center pt-10">
        <AddProduct onClick={handlesubmit}/>
        </div>

        {/* Product Grid */}
        <ProductList />

      </div>
    </>
  );
}
