import { ReactTyped } from "react-typed";
import LandingNavbar from "../components/LandingNavbar";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-indigo-500 to-green-400 text-white">
      {/* Header
      <header className="py-4 bg-black bg-opacity-50 text-center text-lg font-semibold">
        Welcome to the Future of Reviews
      </header> */}
      
      <LandingNavbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-grow px-6">
        <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
          <ReactTyped
            strings={["Earn Money for Reviews", "Get Paid Instantly", "Honest Reviews, Instant Rewards", "Transform Feedback into Revenue"]}
            typeSpeed={70}
            backSpeed={40}
            loop
            showCursor={true}
          />
        </h1>
        <p className="mt-6 text-lg font-light max-w-2xl">
          Earn $1-$1.5 for every verified review while helping brands improve their products.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="mt-10 flex space-x-6">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
            Join as a Company
          </button>
          <a href="/user" className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
            Sign Up as a User
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 bg-black bg-opacity-50 text-center text-sm">
        © 2025 Review Rewards. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
