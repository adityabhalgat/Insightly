import Navbar from "../components/Admin/Navbar";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaBuilding, FaUsers, FaDollarSign, FaComments } from "react-icons/fa";

export default function Admin() {
  const [data, setData] = useState({
    companies: 0,
    users: 0,
    paidByCompanies: 0,
    paidToUsers: 0,
    reviews: 0,
  });
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData({
        companies: 120,
        users: 4500,
        paidByCompanies: 15000,
        paidToUsers: 13500,
        reviews: 3200,
      });

      setReviews([
        { id: 1, createdAt: "2024-03-18T10:00:00Z" },
        { id: 2, createdAt: "2024-03-18T12:30:00Z" },
        { id: 3, createdAt: "2024-03-19T14:15:00Z" },
        { id: 4, createdAt: "2024-03-19T18:45:00Z" },
        { id: 5, createdAt: "2024-03-20T09:30:00Z" },
        { id: 6, createdAt: "2024-03-20T11:45:00Z" },
        { id: 7, createdAt: "2024-03-21T15:00:00Z" },
        { id: 8, createdAt: "2024-03-21T17:20:00Z" },
      ]);
    }, 1000);
  }, []);

  const chartData = reviews.reduce((acc, review) => {
    const date = new Date(review.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.entries(chartData).map(([date, count]) => ({ name: date, count }));

  const stats = [
    { label: "Companies", value: data.companies, icon: <FaBuilding className="text-blue-500 text-3xl" /> },
    { label: "Users", value: data.users, icon: <FaUsers className="text-green-500 text-3xl" /> },
    { label: "Paid by Companies", value: `$${data.paidByCompanies}`, icon: <FaDollarSign className="text-yellow-500 text-3xl" /> },
    { label: "Paid to Users", value: `$${data.paidToUsers}`, icon: <FaDollarSign className="text-red-500 text-3xl" /> },
    { label: "Reviews", value: data.reviews, icon: <FaComments className="text-purple-500 text-3xl" /> },
  ];

  return (
    <>
      <Navbar />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-lg flex items-center space-x-4 border-t-4 border-blue-500">
            {stat.icon}
            <div>
              <h2 className="text-gray-600 text-lg font-medium">{stat.label}</h2>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Reviews Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedChartData}>
              <XAxis dataKey="name" tick={{ fill: "#4A5568" }} />
              <YAxis tick={{ fill: "#4A5568" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1A202C", color: "#fff" }} />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}