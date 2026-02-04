import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Reagester'
import VerifyOtp from '../VerifyOtp'
import Login from '../Login'
 import HomePage from "../HomePage"
import ContactUs from '../ContactUs'
import AboutApp from '../AboutApp'
const Rout = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/regester' element={<Register />} />
      <Route path='/verifyotp' element={<VerifyOtp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contactus' element={<ContactUs />} />
      <Route path='/about' element={<AboutApp />} />
      
    </Routes>
  )
}

export default Rout
