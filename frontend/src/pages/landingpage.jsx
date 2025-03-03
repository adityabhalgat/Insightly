// import { useState } from 'react'
import { ReactTyped } from "react-typed";
import LandingNavbar from "../components/LandingNavbar";

//import background from '../assets/landing_page_bg.svg?url'

function LandingPage() {
  //const [count, setCount] = useState(0)

//   const bgStyle = {
//     backgroundImage: `url(${background})`
//   }

  return (
    
    <div
      className="bg-linear-to-tr from-indigo-200 to-green-200 bg-cover bg-center h-full w-full"
      // style={{ backgroundImage: "url('/landing_page_bg.svg')"}}
    >

    <LandingNavbar />
      {/* Content */}

      <div className='text-black text-5xl h-70 text-center pt-40 font-mono font-bol'>
      <h1>
        {/* Earn Money{" "} */}
        <ReactTyped
          strings={["Earn Money for Reviews",
            "Earn Money Instantly",
            "Get Paid for Your Honest Reviews",
            "Actionable Reviews for Smarter Decisions",
            "Transform Feedback into Higher Revenue"
          ]}
          typeSpeed={80}
          loop
          backSpeed={35}
          cursorChar=""
          showCursor={true}
        />
      </h1>
    </div>

    <div className="pt-20 flex justify-center font-extralight text-xl">
    Earn $1-$1.5 for every verified review while helping brands improve their products.
    </div>

    <div className="pt-20 flex justify-center h-screen">
      <div className="space-x-8 flex flex-row">
        <button className="bg-white text-gray-800 w-75 h-16 px-10 py-3 rounded-full hover:bg-gray-200 transition text-2xl font-extralight">
          Join us as a Company
        </button>
        <button className="bg-white text-gray-800 w-75 h-16 px-10 py-3 rounded-full hover:bg-gray-200 transition text-2xl font-extralight">
          Sign up as a User
        </button>
      </div>
    </div>

    </div>
  )
}

export default LandingPage
