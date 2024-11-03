import React from 'react'
import Signup from './Signup'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './userProfile'

const RootRoute = () => {
  return (
    <Routes>
      <Route path='/' Component={Signup}/>
      <Route path='/chat' Component={Home}/>
      <Route path='/user' Component={UserProfile}/>
    </Routes>
  )
}

export default RootRoute