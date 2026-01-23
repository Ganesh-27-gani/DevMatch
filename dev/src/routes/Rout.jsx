import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Reagester'
import VerifyOtp from '../VerifyOtp'
import Login from '../Login'
 import HomePage from "../HomePage"
import ContactUs from '../ContactUs'
const Rout = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/regester' element={<Register />} />
      <Route path='/verifyotp' element={<VerifyOtp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contactus' element={<ContactUs />} />
      
    </Routes>
  )
}

export default Rout
