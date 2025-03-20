// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/landingpage'
import { Route, Routes } from 'react-router-dom'
import User from './pages/User'
import WriteAReview from './pages/WriteAReview'
import MyEarnings from './pages/MyEarnings'
import MyReviews from './pages/MyReviews'
import UserSignUp from './pages/UserSignUp'
import CompanySignUp from './pages/CompanySignUp'
import CompanyDashboard from './pages/CompanyDashboard'
import ProductManagement from './pages/ProductManagement'
import AddProductPage from './pages/AddProductPage'
import ReviewManagement from './pages/ReviewManagement'
import Admin from './pages/Admin'
import ManageReviews from './pages/ManageReviews'
import AboutUs from './pages/AboutUs'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        
        <Route path="/" element ={<LandingPage />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/companysignup" element={<CompanySignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/writeareview/:id" element={<WriteAReview />} />
        <Route path="/myearnings" element={<MyEarnings />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/companydashboard" element={<CompanyDashboard />} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/reviewmanagement" element={<ReviewManagement />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/managereviews" element={<ManageReviews />} />
      </Routes>
      
      {/* <LandingPage /> */}
    </div>
  )
}

export default App
