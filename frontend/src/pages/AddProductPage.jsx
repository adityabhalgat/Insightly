import { useState } from "react";
import axios from "axios"; // Import Axios
import Navbar from "../components/Company/Navbar";
import BackButton from "../components/User/BackButton";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:5001`;
export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        AmazonLink: "",
        FlipkartLink: ""
    });

    const [message, setMessage] = useState({ text: "", type: "" }); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log("Sending Token:", token); 
    
            if (!token) {
                setMessage({ text: "No token found. Please log in again.", type: "error" });
                return;
            }
    
            const response = await axios.post(
                `${API_BASE_URL}/api/products/create`,
                {
                    name: formData.name,
                    category: formData.category,
                    description: formData.description,
                    AmazonLink: formData.AmazonLink,
                    FlipkartLink: formData.FlipkartLink

                },
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                }
            );
    
            if (response.status === 201) {
                setMessage({ text: "Product added successfully!", type: "success" });
                setTimeout(() => navigate("/productmanagement"), 1500);
            }
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
            setMessage({ text: "Failed to add product. Please try again.", type: "error" });
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200">
            <div className="bg-white shadow-md">
            <Navbar />
            </div>
            
            <div className="mx-auto p-5">
                <BackButton />  
            </div>

            <div className="max-w-2xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6">Add Product</h2>

                {message.text && (
                    <div className={`p-3 mb-6 text-white rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                        {message.text}
                    </div>
                )}

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
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg">Amazon Link : </label>
                        <textarea
                         name = "AmazonLink"
                         type="text"
                         placeholder="Enter the Amazon link"
                         value={formData.AmazonLink}
                         onChange={handleChange}
                         required
                         className="w-full p-3 border border-gray-300 rounded text-lg"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg">Flipkart Link : </label>
                        <textarea
                         name = "FlipkartLink"
                         type="text"
                         placeholder="Enter the Flipkart link"
                         value={formData.FlipkartLink}
                         onChange={handleChange}
                         required
                         className="w-full p-3 border border-gray-300 rounded text-lg"
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
        </div>
    );
}
