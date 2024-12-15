import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
export let User = { name: "", phone: "", email: "" };
const Signup = () => {
  let navigate = useNavigate();
  let [number, setNumber] = useState("");
  let [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [buttonBgColor, setButtonBgColor] = useState("bg-purple-400");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let [isSpin, setIsSpin] = useState(false);
  const FunOnChange = (e) => {
    setNumber(e.target.value);
    console.log(e.target.value);
    if (number.length < 3) {
      setPhoneError("invalid number");
    } else {
      setPhoneError("");
    }
  };
  const FunOnChangePass = (e) => {
    setPassword(e.target.value);
    if (password.length < 3) {
      setPasswordError("Weak passpword");
    } else {
      setPasswordError("");
    }
  };
  const handOnContinue = (e) => {
    e.preventDefault();

    if (isChecked) {
      alert("check the policies");
    } else {
      
      if (!number || !password) {
        alert("invalid input");
      }else if(number.length <= 3 || password.length <= 3){
        alert('Please recheck the number and password')
      }else{
        alert('logged in')
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
    <div
      className="h-screen bg-gray-700 grid items-center justify-center"
      id="bg-image"
    >
      <div className="bg-purple-700 absolute w-full top-0 font-bold text-lg text-white p-2 font-mono">
        React-Chat
      </div>
      <div className=" flex flex-col gap-5 rounded-lg p-5 m-auto w-[60%] bg-gray-200">
        <form action="" className="flex flex-col text-black gap-3">
          <h1 className="font-bold text-xl text-center font-mono">Signin</h1>
          <div className="h-px bg-red-400 hidden"></div>
          <div>
            <input
              autoFocus
              value={number}
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
          </div>
          <div className="p-4 leading-4">
            <input type="checkbox" id="check" onChange={checkFun} />
            <label htmlFor="check" className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              exercitationem.
            </label>
          </div>

          <button
            className={`text-white ${!isChecked ? 'bg-purple-700' :'bg-purple-400'} ${
              buttonBgColor == "bg-purple-400"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } rounded-full p-2 font-bold text-lg`}
            onClick={handOnContinue}
          >
            continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
