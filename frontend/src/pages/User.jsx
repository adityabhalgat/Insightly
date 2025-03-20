
import Navbar from "../components/User/Navbar";
import ProductList from "../components/User/ProductList";

export default function User() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200">
      <Navbar />
      <ProductList />
    </div>
  );
}