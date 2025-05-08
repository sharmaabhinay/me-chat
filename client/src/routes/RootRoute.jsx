import React, { useEffect, useState } from 'react';
import Signup from './Signup';
import Home from './Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './userProfile';
import Coockies from 'js-cookie';import axios from 'axios';
import BackendUrl from '../backendUrl';
import { set_User_Data } from '../redux/user/action';
import { useDispatch, useSelector } from 'react-redux';
;

const RootRoute = () => {
  const result = useSelector((state) => state.rootReducer.userData.isLoggedIn);
  let dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Check if the user is logged in (e.g., by checking for a cookie)
  const getUser = async (token)  => {
    setIsLoading(false);
    try {
      let response = await axios.post(`${BackendUrl}/auth`, {userId: token});
      setIsLoading(false)
      if(response){
        if(response.status == 200){
          setIsLoggedIn(true)
          dispatch(set_User_Data(response.data.data))
        }else{
          console.log('error in getting user data')
        }
      }
    } catch (error) {
      setIsLoading(false)
      if(error.response){
        if(error.response.status == 401){
          console.log('user not found')
        }else{
          console.log('error in getting user data')
        }
      }
      console.error('Error fetching user data:', error);
      
    }
  }
  useEffect(()=> {
    const token = Coockies.get('userId');
    if(token){
      getUser(token)
    }else{
      return;
    }
  },[result.isLoggedIn])
 
  

  

  return (
    <Routes>
      {/* Redirect to Home or Auth based on login status */}
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/auth" />} />
      {/* Prevent logged-in users from accessing the /auth route */}
      <Route path="/auth" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
      {/* <Route path="/chat" element={<Home />} /> */}
      <Route path="/user" element={<UserProfile />} />
    </Routes>
  );
};

export default RootRoute;