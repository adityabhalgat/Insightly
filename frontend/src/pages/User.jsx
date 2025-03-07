import Navbar from "../components/User/Navbar";
import ProductList from "../components/User/ProductList";

export default function User() {



    return (
        <div className="bg-linear-to-tr from-indigo-200 to-green-200 bg-center min-h-screen w-full"
>
            <Navbar />
            
            <div>
                <ProductList />
            </div>
        </div>
    )
}