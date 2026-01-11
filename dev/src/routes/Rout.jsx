import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Reagester'
import VerifyOtp from '../VerifyOtp'
import Login from '../Login'
import Ui from '../ui'


const Rout = () => {
    return (
        <Routes>
            <Route path='/regester' element={<Register />} />
            <Route path='/verifyotp' element={<VerifyOtp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Ui/>} />
        </Routes>
    )
}

export default Rout