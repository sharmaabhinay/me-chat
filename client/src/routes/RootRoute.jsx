import React, { useEffect } from 'react';
import Signup from './Signup';
import Home from './Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './userProfile';
import Coockies from 'js-cookie';import axios from 'axios';
import BackendUrl from '../backendUrl';
import { set_User_Data } from '../redux/user/action';
import { useDispatch } from 'react-redux';
;

const RootRoute = () => {
  let dispatch = useDispatch()
  // Check if the user is logged in (e.g., by checking for a cookie)
  const isLoggedIn = document.cookie.includes('userId=');
  let userId = Coockies.get('userId');
  // useEffect(()=> {
  //   if(userId){
  //     const fetchUserData = async ()=> {
  //       console.log('root function called')
  //       let response = await axios.post(`${BackendUrl}/auth`,{ userId:userId})
  //       console.log(response.data)
  //       if(response.status == 200){
  //         dispatch(set_User_Data(response.data))
  //       }else{
  //         return
  //       }
  //     }
  //     fetchUserData()
  //   }
  // },[])
  

  return (
    <Routes>
      {/* Redirect to Home or Auth based on login status */}
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/auth" />} />
      {/* Prevent logged-in users from accessing the /auth route */}
      <Route path="/auth" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
      <Route path="/chat" element={<Home />} />
      <Route path="/user" element={<UserProfile />} />
    </Routes>
  );
};

export default RootRoute;