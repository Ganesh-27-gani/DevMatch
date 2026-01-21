import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Reagester'
import VerifyOtp from '../VerifyOtp'
import Login from '../Login'
import Ui from '../ui'
import About from '../About'
import OurService from '../OurService'
 
const Rout = () => {
  return (
    <Routes>
      <Route path='/' element={<Ui />} />
      <Route path='/regester' element={<Register />} />
      <Route path='/verifyotp' element={<VerifyOtp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/service' element={<OurService />} />
      <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default Rout
