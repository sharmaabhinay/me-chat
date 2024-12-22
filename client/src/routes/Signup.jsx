import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_sign_in } from "../redux/user/action";
export let User = { name: "", phone: "", email: "" };
import BackendUrl from "../backendUrl";
import Signin from "../components/Signin";
import CreateAccount from "../components/CreateAccount";




const Signup = () => {
  const result = useSelector((state)=> state.rootReducer.userData)
  // console.log(result)
 const [authComponent,setAuthComponent] = useState('signin')

  return (
    <div
      className="h-screen bg-gray-700 grid items-center justify-center"
      id="bg-image"
    >
      <div className="bg-purple-700 absolute w-full top-0 font-bold text-lg text-white p-2 font-mono">
        React-Chat
      </div>
      <div className="flex bg-gray-200 flex-col gap-5 rounded-lg p-5 m-auto w-[60%] rotate-y-180">
        <div className="flex justify-center gap-3">
          <button onClick={()=> setAuthComponent('signin')} className={`bg-gray-300 text-black p-1 rounded-full text-lg font-medium w-[40%] ${authComponent == 'signin' ? 'bg-purple-700 text-white' : null}`}>Signin</button>
          <button onClick={()=> setAuthComponent('signup')} className={`bg-gray-300 text-black p-1 rounded-full text-lg font-medium w-[40%] ${authComponent == 'signup' ? 'bg-purple-700 text-white' : null}`}>Signup</button>
        </div>
        {
          authComponent == 'signin' ? <Signin /> : <CreateAccount />
        }
       
        
      </div>
    </div>
  );
};

export default Signup;
