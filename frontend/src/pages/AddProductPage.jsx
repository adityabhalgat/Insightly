import { useState } from "react";
import Navbar from "../components/Company/Navbar";
import BackButton from "../components/User/BackButton";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data Submitted:", formData);
        //=========================================
        // Add logic to send data to backend
        //=========================================
        navigate("/productmanagement");
    };

    return (
        <>
            <Navbar />

            <div className="mx-auto p-5">
                <BackButton />  
            </div>
            

            <div className="max-w-2xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg">Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded text-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg">Category:</label>
                        <input 
                            type="text" 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded text-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg">Description:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded text-lg h-60"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}