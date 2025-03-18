import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({ userName: "", password: "", email: "" });

  const navigate = useNavigate();
  
  // Dummy list of signed-up users
  const [userList, setUserList] = useState([
    { userName: "johnDoe", password: "12345", email: "john@example.com" },
    { userName: "janeDoe", password: "password", email: "jane@example.com" },
  ]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      try {
        // BACKEND API CALL HERE FOR SIGN-UP
        // const response = await axios.put("", data);
        // if (response && response.status >= 200 && response.status < 300) {
        //   console.log("Sign Up successful!");
        //   setIsSignUp(!isSignUp);
        // } else {
        //   console.log("Error!", response.data);
        // }
        // END

        // Check if user already exists
        const userExists = userList.some(user => user.email === data.email);
        if (userExists) {
          console.log("User already exists!");
          return;
        }

        // Add user to the list
        setUserList(prevUsers => [...prevUsers, data]);
        console.log("User signed up successfully!", data);
        setIsSignUp(!isSignUp);
        // TO NAVIGATE TO USER PAGE
        navigate("/user");
      } catch (e) {
        console.log("Error:", e);
      }
    } else {
      try {
        // BACKEND API CALL HERE FOR LOGIN
        // const response = await axios.post("", data);
        // if (response && response.status >= 200 && response.status < 300) {
        //   console.log("Success Login!");
        //   setIsLogged(!isLogged);
        // } else {
        //   console.log("Error!", response.data);
        // }
        // END
        // ADD NAVIGATE TO USER PAGE

        // Check if user exists in the list
        const user = userList.find(
          user => user.email === data.email && user.password === data.password
        );
        if (user) {
          console.log("Login successful!", user);
          setIsLogged(!isLogged);

          // TO NAVIGATE TO USER PAGE
          navigate("/user");
        } else {
          console.log("Invalid email or password");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 p-4">
      <form
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-sm bg-white shadow-lg rounded-lg p-6 flex flex-col gap-6"
        onSubmit={handleClick}
      >
        <div className="text-center font-bold text-2xl sm:text-3xl text-blue-800">
          {isSignUp ? "Sign Up" : "Login"}
        </div>

        <div className="flex flex-col gap-4">

        { isSignUp && (
            <div className="flex flex-col gap-2">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={data.userName}
              className="shadow-md border border-blue-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setData((prev) => ({ ...prev, userName: e.target.value }))
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
        </div>
      </form>
    </div>
  );
};

export default UserSignUp;
