import { useState } from 'react'
import { ReactTyped } from "react-typed";

//import background from '../assets/landing_page_bg.svg?url'

function LandingPage() {
  //const [count, setCount] = useState(0)

//   const bgStyle = {
//     backgroundImage: `url(${background})`
//   }

  return (
    
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/landing_page_bg.svg')"}}
    >
      {/* Content */}

      <div className='text-white text-7xl text-center pt-70 font-mono font-bold'>
      <h1>
        Earn Money{" "}
        <ReactTyped
          strings={["for Reviews",
            "Instantly",
          ]}
          typeSpeed={140}
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
