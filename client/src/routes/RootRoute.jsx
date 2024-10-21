import React from 'react'
import Signup from './Signup'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'

const RootRoute = () => {
  return (
    <Routes>
      <Route path='/' Component={Signup}/>
      <Route path='/chat' Component={Home}/>
    </Routes>
  )
}

export default RootRoute