import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_sign_in, set_User_Data } from "../redux/user/action";
export let User = { name: "", phone: "", email: "" };
import BackendUrl from "../backendUrl";

const Signin = ()=> {
   const result = useSelector((state)=> state.rootReducer.userData)
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [buttonBgColor, setButtonBgColor] = useState("bg-purple-400");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    let [isSpin, setIsSpin] = useState(false);
    const FunOnChange = (e) => {
      setPhone(e.target.value);
      if (phone.length < 3) {
        setPhoneError("invalid number");
      } else {
        setPhoneError("");
      }
    };
    useEffect(()=> {
      // console.log(result)
    },[result])
    const postingData = async () => {
      setIsSpin(true);
      try {
        const {data} = await axios.post(`${BackendUrl}/signin`,{phone:phone,password:password})
        // console.log(data.data)
        if(data){
          setIsSpin(false);
        }; 
        if(data.message == 'user logged in'){
          dispatch(set_User_Data(data.data))
          navigate('/chat')
        }else if(data.message == 'wrong password'){
          setPasswordError('wrong password')
        }else if(data.message == 'user not found'){
          setPhoneError('user not found')
        }else{
          alert('something went wrong')
          setIsSpin(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    const FunOnChangePass = (e) => {
      setPassword(e.target.value);
      // if (password.length < 3) {
      //   setPasswordError("Weak passpword");
      // } else {
      //   setPasswordError("");
      // }
    };
    const handOnContinue = (e) => {
      e.preventDefault();
  
      if (isChecked) {
        alert("check the policies");
      } else {
        if (!phone || !password) {
          alert("invalid input");
        } else if (phone.length <= 3 || password.length <= 3) {
          alert("Please recheck the phone and password");
        } else {
          postingData();
        }
      }
    };
    const checkFun = (e) => {
      // setIsChecked(true)
      if (!isChecked) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
      console.log(isChecked);
    };
  
    return (
      <form action="" className="flex flex-col text-black gap-3">
            {/* <h1 className="font-bold text-xl text-center font-mono">Signin</h1> */}
            <div className="h-px bg-red-400 hidden"></div>
            <div>
              <input
                autoFocus
                value={phone}
                onChange={FunOnChange}
                type="number"
                placeholder="phone"
                className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 text-lg"
              />
              <p className="text-red-800 text-sm px-4">{phoneError}</p>
            </div>
            <div>
              <input
                value={password}
                onChange={FunOnChangePass}
                type="password"
                placeholder="password"
                className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 text-lg"
              />
              <p className="text-red-800 text-sm px-4">{passwordError}</p>
            </div>
  
            <div className="px-4">
              <a href="" className="text-sm text-blue-800">
                Forgot password ?
              </a>
              {/* <a href="/signup">create account</a> */}
            </div>
            <div className="p-4 leading-4">
              <input type="checkbox" id="check" onChange={checkFun} />
              <label htmlFor="check" className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                exercitationem.
              </label>
            </div>
  
            <div
              className={`text-white flex justify-center gap-5 items-center ${
                !isChecked ? "bg-purple-700" : "bg-purple-400"
              } ${isSpin ? 'bg-purple-700' : null}
               ${
                isChecked
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } rounded-full p-2 font-bold text-lg`}
              onClick={handOnContinue}
            >
              <span>continue</span> <div className={`h-5 w-5 rounded-full border-b-0 border-2 animate-spin border-white ${!isSpin ? 'hidden' : 'block'}`}></div>
            </div>
          </form>
    )
  }

export default Signin