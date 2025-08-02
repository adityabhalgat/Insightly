import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:5001`;

const UserSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent duplicate submits
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!data.username.trim()) {
          setError("Username cannot be empty.");
          return;
        }

        const response = await axios.post(
          `${API_BASE_URL}/api/auth/register`,
          {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
          }
        );

        console.log("User signed up successfully!", response.data);
        alert("Sign-up successful! Please log in.");
        setIsSignUp(false);
        setData({
          username: "",
          email: "",
          password: "",
          role: "user",
        });
        // OPTIONAL: auto-navigate to login route if separated
        // navigate("/login");
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login`,
          {
            email: data.email,
            password: data.password,
          }
        );

        console.log("Login successful!", response.data);

        // Save token if present
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        } else {
          console.warn("No token in login response.");
        }

        // Use fallback to "user" if role missing
        const userRole = response.data?.role || "user";

        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong during authentication."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

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
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Signing Up..."
                : "Logging In..."
              : isSignUp
              ? "Sign Up"
              : "Login"}
          </button>

          <button
            type="button"
            className="text-sm text-blue-600 hover:underline text-center mt-2"
            onClick={() => {
              setIsSignUp((prev) => !prev);
              setError(null);
              setData({
                username: "",
                email: "",
                password: "",
                role: "user",
              });
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
