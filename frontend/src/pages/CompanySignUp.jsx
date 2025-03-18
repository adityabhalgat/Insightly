import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanySignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({ company: "", password: "", email: "" });

  const navigate = useNavigate();

  // Dummy list of registered companies
  const [users, setUsers] = useState([
    { company: "CompanyA", email: "companya@example.com", password: "12345" },
    { company: "CompanyB", email: "companyb@example.com", password: "password" },
  ]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Check if the company is already registered
      const existingUser = users.find((user) => user.email === data.email);
      if (existingUser) {
        console.log("Company already registered!");
        return;
      }

      // ===========================
      // API CALL FOR SIGN UP (DISABLED)
      // ===========================
      // try {
      //   const response = await axios.put("API_URL_HERE", data);
      //   if (response.status >= 200 && response.status < 300) {
      //     console.log("Sign Up successful!");
      //     setUsers((prevUsers) => [...prevUsers, data]); // Add new user to the list
      //     setIsSignUp(false); // Switch to login mode after signing up
      //   } else {
      //     console.log("Error!", response.data);
      //   }
      // } catch (e) {
      //   console.log("Error:", e);
      // }

      // Dummy behavior instead of API call
      console.log("Sign Up successful (Dummy)!");
      setUsers((prevUsers) => [...prevUsers, data]); // Add new user to the list
      setIsSignUp(false); // Switch to login mode
    } else {
      // Login check
      const validUser = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (validUser) {
        console.log("Login successful!");
        navigate("/companydashboard");
      } else {
        console.log("Invalid email or password!");
      }

      // ===========================
      // API CALL FOR LOGIN (DISABLED)
      // ===========================
      // try {
      //   const response = await axios.post("API_URL_HERE", data);
      //   if (response.status >= 200 && response.status < 300) {
      //     console.log("Login successful!");
      //   } else {
      //     console.log("Error!", response.data);
      //   }
      // } catch (e) {
      //   console.log("Error:", e);
      // }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 p-4">
      <form
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-sm bg-white shadow-lg rounded-lg p-6 flex flex-col gap-6"
        onSubmit={handleClick}
      >
        <div className="text-center font-bold italic text-2xl sm:text-3xl text-blue-800">
          {isSignUp ? "Sign Up" : "Login"}
        </div>

        <div className="flex flex-col gap-4">
            { isSignUp && (
                <div className="flex flex-col gap-2">
                <label className="font-semibold">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={data.company}
                  className="shadow-md border border-blue-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, company: e.target.value }))
                  }
                />
              </div>
            )}
          

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="shadow-md border border-blue-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={data.password}
              className="shadow-md border border-blue-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <button
            className="shadow-md w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-400 h-12 rounded-xl text-white italic font-bold hover:opacity-90 transition-all"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Login" : "Create an account"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanySignUp;
