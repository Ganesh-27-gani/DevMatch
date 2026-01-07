import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Reagester'
import VerifyOtp from '../VerifyOtp'
import Login from '../Login'

const Rout = () => {
    return (
        <Routes>
            <Route path='/regester' element={<Register />} />
            <Route path='/verifyotp' element={<VerifyOtp/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    )
}

export default Rout