import Navbar from "../components/Admin/Navbar";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
      //==============
      // API CALL
      //==============
      setData({
        companies: 120,
        users: 4500,
        paidByCompanies: 15000,
        paidToUsers: 13500,
        reviews: 3200,
      });

      //==============
      // API CALL
      //==============
      setReviews([
        { id: 1, text: "Great product!", createdAt: "2024-03-18T10:00:00Z" },
  { id: 2, text: "Fast shipping and good quality.", createdAt: "2024-03-18T12:30:00Z" },
  { id: 3, text: "Would buy again.", createdAt: "2024-03-19T14:15:00Z" },
  { id: 4, text: "Highly recommend!", createdAt: "2024-03-19T18:45:00Z" },
  { id: 5, text: "Not as expected, but decent.", createdAt: "2024-03-20T09:20:00Z" },
  { id: 6, text: "Excellent quality!", createdAt: "2024-03-20T11:30:00Z" },
  { id: 7, text: "Superb packaging.", createdAt: "2024-03-21T08:45:00Z" },
  { id: 8, text: "Loved the product!", createdAt: "2024-03-21T15:10:00Z" },
  { id: 9, text: "Great customer service.", createdAt: "2024-03-22T10:00:00Z" },
  { id: 10, text: "Could be better.", createdAt: "2024-03-22T14:25:00Z" },
  { id: 11, text: "Five stars!", createdAt: "2024-03-23T09:00:00Z" },
  { id: 12, text: "Item arrived late.", createdAt: "2024-03-23T18:45:00Z" },
  { id: 13, text: "Very satisfied!", createdAt: "2024-03-24T07:20:00Z" },
  { id: 14, text: "Would purchase again.", createdAt: "2024-03-24T12:10:00Z" },
  { id: 15, text: "Good quality.", createdAt: "2024-03-25T08:30:00Z" },
  { id: 16, text: "Reasonable price.", createdAt: "2024-03-25T14:50:00Z" },
  { id: 17, text: "Nice experience!", createdAt: "2024-03-26T10:15:00Z" },
  { id: 18, text: "Product as described.", createdAt: "2024-03-26T16:35:00Z" },
  { id: 19, text: "Highly recommended!", createdAt: "2024-03-27T11:00:00Z" },
  { id: 20, text: "Not bad, but expected better.", createdAt: "2024-03-27T17:25:00Z" },
  { id: 21, text: "Fantastic item!", createdAt: "2024-03-28T09:10:00Z" },
  { id: 22, text: "Very responsive seller.", createdAt: "2024-03-28T14:40:00Z" },
  { id: 23, text: "Exactly as shown.", createdAt: "2024-03-29T11:15:00Z" },
  { id: 24, text: "Exceeded my expectations.", createdAt: "2024-03-29T16:55:00Z" },
  { id: 25, text: "Not worth the price.", createdAt: "2024-03-30T08:30:00Z" },
  { id: 26, text: "Would recommend to friends.", createdAt: "2024-03-30T13:25:00Z" },
  { id: 27, text: "Very poor quality.", createdAt: "2024-03-31T07:45:00Z" },
  { id: 28, text: "Fast delivery!", createdAt: "2024-03-31T12:35:00Z" },
  { id: 29, text: "Looks better in person.", createdAt: "2024-04-01T10:20:00Z" },
  { id: 30, text: "A must-buy!", createdAt: "2024-04-01T15:50:00Z" },
  { id: 31, text: "Great for the price.", createdAt: "2024-04-02T09:05:00Z" },
  { id: 32, text: "Came in damaged packaging.", createdAt: "2024-04-02T14:45:00Z" },
  { id: 33, text: "Super easy to use.", createdAt: "2024-04-03T11:30:00Z" },
  { id: 34, text: "Will order again.", createdAt: "2024-04-03T17:00:00Z" },
  { id: 35, text: "Took too long to arrive.", createdAt: "2024-04-04T08:10:00Z" },
  { id: 36, text: "Perfect for my needs.", createdAt: "2024-04-04T12:20:00Z" },
  { id: 37, text: "Not satisfied at all.", createdAt: "2024-04-05T10:40:00Z" },
  { id: 38, text: "Met my expectations.", createdAt: "2024-04-05T15:15:00Z" },
  { id: 39, text: "Great customer support.", createdAt: "2024-04-06T09:25:00Z" },
  { id: 40, text: "Feels premium.", createdAt: "2024-04-06T14:55:00Z" },
  { id: 41, text: "Item was defective.", createdAt: "2024-04-07T08:50:00Z" },
  { id: 42, text: "Would rate 10/10.", createdAt: "2024-04-07T13:40:00Z" },
  { id: 43, text: "Very useful product.", createdAt: "2024-04-08T11:05:00Z" },
  { id: 44, text: "Lacking in quality.", createdAt: "2024-04-08T16:20:00Z" },
  { id: 45, text: "Arrived earlier than expected!", createdAt: "2024-04-09T09:50:00Z" },
  { id: 46, text: "Would gift this to others.", createdAt: "2024-04-09T14:30:00Z" },
  { id: 47, text: "Packaging was damaged.", createdAt: "2024-04-10T10:10:00Z" },
  { id: 48, text: "Very comfortable to use.", createdAt: "2024-04-10T15:55:00Z" },
  { id: 49, text: "Expected better quality.", createdAt: "2024-04-11T08:45:00Z" },
  { id: 50, text: "Good purchase overall.", createdAt: "2024-04-11T13:25:00Z" },
      ]);
    }, 1000);
  }, []);

  const chartData = reviews.reduce((acc, review) => {
    const date = new Date(review.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.entries(chartData).map(([date, count]) => ({ name: date, count }));

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-xl font-bold">Companies</h2>
          <p className="text-2xl font-semibold">{data.companies}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-2xl font-semibold">{data.users}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-xl font-bold">Paid by Companies</h2>
          <p className="text-2xl font-semibold">${data.paidByCompanies}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-xl font-bold">Paid to Users</h2>
          <p className="text-2xl font-semibold">${data.paidToUsers}</p>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <h2 className="text-xl font-bold">Reviews</h2>
          <p className="text-2xl font-semibold">{data.reviews}</p>
        </div>
        <div className="col-span-1 md:col-span-2 p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Reviews Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
