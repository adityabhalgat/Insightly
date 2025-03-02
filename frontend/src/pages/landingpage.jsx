// import { useState } from 'react'
import { ReactTyped } from "react-typed";

//import background from '../assets/landing_page_bg.svg?url'

function LandingPage() {
  //const [count, setCount] = useState(0)

//   const bgStyle = {
//     backgroundImage: `url(${background})`
//   }

  return (
    
    <div
      className="bg-linear-to-tr from-indigo-200 to-green-200 h-screen bg-cover bg-center"
      // style={{ backgroundImage: "url('/landing_page_bg.svg')"}}
    >
      {/* Content */}

      <div className='text-black text-7xl text-center pt-70 font-mono font-bol'>
      <h1>
        {/* Earn Money{" "} */}
        <ReactTyped
          strings={["Earn Money for Reviews",
            "Earn Money Instantly",
            "Get Paid for Your Honest Reviews"
          ]}
          typeSpeed={80}
          loop
          backSpeed={35}
          cursorChar=""
          showCursor={true}
        />
      </h1>
    </div>

    </div>
  )
}

export default LandingPage
