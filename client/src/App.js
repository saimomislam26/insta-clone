import React from 'react'
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import Navbar from './Component/Header/Navbar'
import Login from './Component/Body/Login'
import Signup from './Component/Body/Signup'
import Home from './Component/Body/Home'
import Profile from './Component/Body/Profile'
import Createpost from './Component/Body/Createpost'
import ProtectedRouter from './Component/ProtectedRouter/ProtectedRouter'
import Cookies from 'js-cookie'
import Logout from './Component/Body/Logout'
const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRouter><Home /></ProtectedRouter>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/logout' element={<ProtectedRouter><Logout/></ ProtectedRouter>} />
        <Route path="/profile" element={<ProtectedRouter><Profile/></ProtectedRouter>} />
        <Route path='/create' element={<ProtectedRouter><Createpost/></ProtectedRouter>}/>
      </Routes>
    </div>
  )
}

export default App
