import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Company/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function CompanyDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products/getall");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const analyticsData = {
    totalProducts: products.length,
    totalReviews: products.reduce((sum, product) => sum + product.reviewCount, 0),
    purchasedReviews: 210,
    availableReviews: 115,
  };

  const reviewPieData = [
    { name: "Purchased Reviews", value: analyticsData.purchasedReviews },
    { name: "Available Reviews", value: analyticsData.availableReviews },
  ];

  const COLORS = ["#4CAF50", "#FF9800"];
  const shortenName = (name) => (name.length > 15 ? `${name.substring(0, 12)}...` : name);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-100 to-indigo-200 px-8 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">📊 Analytics Dashboard</h1>

          {loading ? (
            <p className="text-center text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {[ 
                  { title: "Total Products", value: analyticsData.totalProducts },
                  { title: "Total Reviews", value: analyticsData.totalReviews },
                  { title: "Purchased Reviews", value: analyticsData.purchasedReviews },
                  { title: "Available Reviews", value: analyticsData.availableReviews },
                ].map((item, index) => (
                  <div key={index} className="bg-white p-8 shadow-xl rounded-xl text-center border border-gray-300 hover:scale-105 transform transition-all duration-300 ease-in-out">
                    <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
                    <p className="text-3xl font-extrabold text-blue-600">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Bar Chart */}
                <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-300">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">📈 Review Submission Trend</h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={products}>
                      <XAxis dataKey="name" tick={{ fontSize: 14 }} tickFormatter={shortenName} />
                      <YAxis tick={{ fontSize: 14 }} />
                      <Tooltip />
                      <Bar dataKey="reviewCount" fill="#3b82f6" barSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-300">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">📊 Purchased vs Available Reviews</h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie data={reviewPieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                        {reviewPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
