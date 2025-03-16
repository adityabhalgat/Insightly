import Navbar from "../components/User/Navbar";
import ProductList from "../components/User/ProductList";

export default function User() {



    return (
        <div className="bg-gradient-to-tr from-indigo-500 to-green-400 bg-fixed min-h-screen w-full">
            <Navbar />

            
            
            <div>
                <ProductList />
            </div>
        </div>
    )
}