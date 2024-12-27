import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import axios from "axios";
import { set_sign_in } from "../redux/user/action";
export let User = { name: "", phone: "", email: "" };
import BackendUrl from "../backendUrl";

const CreateAccount = ()=> {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [buttonBgColor, setButtonBgColor] = useState("bg-purple-400");
    const [phoneError, setPhoneError] = useState("");
    const [cpassword , setCpassword] = useState('')
    const [cPErr,setCPError] = useState('')
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
    const postingData = async () => {
      try {
        const response = await axios.post(`${BackendUrl}/signup`,{phone:phone,password:password})
        if(response.data == 'already registered'){
          setIsSpin(false)
          setPhoneError('number already registered')
        }else if(response.data.message == 'user created'){
          setIsSpin(false)
          alert('number registered successfully')
          dispatch(set_sign_in(response.data.data))
          navigate('/user')
        }else{
          setIsSpin(false)
          alert('something went wrong')
        }
      } catch (err) {
        console.log(err);
      }
    };
    const FunOnChangePass = (e) => {
      setPassword(e.target.value);
      if (password.length < 3) {
        setPasswordError("min 3 chars");
      } else {
        setPasswordError("");
      }
    };
    const FunOnCPassword = (e)=> {
      setCpassword(e.target.value);
      if(e.target.value != password){
        setCPError('password not matched')
      }else{
        setCPError('')
      }
    }
    const handOnContinue = (e) => {
      e.preventDefault();
  
      if (isChecked) {
        alert("check the policies");
      } else {
        if (!phone || !password || !cpassword) {
          alert("invalid input");
        } else if (phone.length <= 3 || password.length <= 3) {
          alert("Please recheck the phone and password");
        } else if(cpassword !== password){
          alert('confirm password not matched')
        }
         else {
          setButtonBgColor('bg-purple-400')
          setIsSpin(true)
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
    };
  
    return (
      <form action="" className="flex flex-col text-black gap-3">
      
            {/* <h1 className="font-bold text-xl text-center font-mono">Signup</h1> */}
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
                placeholder="confirm password"
                className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 text-lg"
              />
              <p className="text-red-800 text-sm px-4">{passwordError}</p>
            </div>
            <div>
              <input
                value={cpassword}
                onChange={FunOnCPassword}
                type="password"
                placeholder="password"
                className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 text-lg"
              />
              <p className="text-red-800 text-sm px-4">{cPErr}</p>
            </div>
  
            <div className="px-4">
              
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

export default CreateAccount