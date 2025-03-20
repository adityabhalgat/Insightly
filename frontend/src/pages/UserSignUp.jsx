import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001/api/auth"; // Update with your backend URL

const UserSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({ username: "", email: "", password: "", role: "user" });
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        if (!data.username.trim()) {
          setError("Username cannot be empty.");
          return;
        }

        // Sign-up API request
        const response = await axios.post(`${API_BASE_URL}/register`, {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role, // Role is required only during signup
        });

        console.log("User signed up successfully!", response.data);
        alert("Sign-up successful! Please log in.");
        setIsSignUp(false); // Switch to login mode
        setData({ username: "", email: "", password: "", role: "user" }); // Reset form
      } else {
        // Temporary Admin Check
        if (data.email === "admin@gmail.com" && data.password === "admin") {
          console.log("Admin login successful!");
          navigate("/admin"); // Redirect to admin dashboard
          return;
        }

        // Login API request for normal users
        const response = await axios.post(`${API_BASE_URL}/login`, {
          email: data.email,
          password: data.password,
        });

        console.log("Login successful!", response.data);
        
        // Save authentication token (if applicable)
        localStorage.setItem("token", response.data.token);

        navigate("/user"); // Redirect to user dashboard
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div>
              <label className="text-gray-700 font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={data.username}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
                required
              />
            </div>
          )}

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={data.password}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <button
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <button
            type="button"
            className="text-sm text-blue-600 hover:underline text-center mt-2"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null); // Clear error when switching modes
              setData({ username: "", email: "", password: "", role: "user" }); // Reset form
            }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
