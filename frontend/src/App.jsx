import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/landingpage'
import { Route, Routes } from 'react-router-dom'
import User from './pages/User'
import WriteAReview from './pages/WriteAReview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        
        <Route path="/" element ={<LandingPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/writeareview" element={<WriteAReview />} />
      </Routes>
      
      {/* <LandingPage /> */}
    </div>
  )
}

export default App
