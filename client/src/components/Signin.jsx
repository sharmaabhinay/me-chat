import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_sign_in, set_User_Data } from "../redux/user/action";
export let User = { name: "", phone: "", email: "" };
import BackendUrl from "../backendUrl";
import Coockies from "js-cookie";

const Signin = () => {
  const result = useSelector((state) => state.rootReducer.userData);
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
  useEffect(() => {
    // console.log(result)
  }, [result]);
  const postingData = async () => {
    console.log('function called')
    setIsSpin(true);
    try {

      const response = await axios.post(`${BackendUrl}/signin`, {
        phone: phone,
        password: password,
      });
      if(response){
        console.log(response.data)
      }
      setIsSpin(false);
      if (response.status === 200) {
        // document.cookie = `userId=${response.data.data._id}; path=/`;
        Coockies.set("userId", response.data.data._id, { expires: 7 , path: '/'});
        dispatch(set_User_Data(response.data.data));
        // alert("Login successful"); 
        
        location.reload();
        // navigate("/chat");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setIsSpin(false);
      if (err.response) {
        if (err.response.status === 401) {
          setPasswordError("wrong password");
        } else if (err.response.status === 500) {
          setPhoneError("Server error. Please try again later.");
        } else if (err.response.status === 404) {
          setPhoneError("User not found. Please check your phone number.");
        }else{
          console.log(err)
          alert("An unexpected error occurred. Please try again.");
        }
      }
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
          className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 md:text-lg"
        />
        <p className="text-red-800 text-sm px-4">{phoneError}</p>
      </div>
      <div>
        <input
          value={password}
          onChange={FunOnChangePass}
          type="password"
          placeholder="password"
          className="outline-none w-full focus:border-purple-700 border-2 rounded-full p-2 px-4 md:text-lg"
        />
        <p className="text-red-800 text-sm px-4">{passwordError}</p>
      </div>

      <div className="px-4 text-end">
        <a href="" className="text-sm text-blue-800">
          Forgot password ?
        </a>
        {/* <a href="/signup">create account</a> */}
      </div>
      <div className="p-4 leading-4">
        <input type="checkbox" id="check" onChange={checkFun} />
        <label htmlFor="check" className="text-sm md:text-sm xs:text-xs">
          I agree to the terms and conditions.
        </label>
      </div>

      <div
        className={`text-white flex justify-center gap-5 items-center ${
          !isChecked ? "bg-purple-700" : "bg-purple-400"
        } ${isSpin ? "bg-purple-700" : null}
               ${
                 isChecked ? "cursor-not-allowed" : "cursor-pointer"
               } rounded-full p-2 font-bold text-lg`}
        onClick={handOnContinue}
      >
        <span>continue</span>{" "}
        <div
          className={`h-5 w-5 rounded-full border-b-0 border-2 animate-spin border-white ${
            !isSpin ? "hidden" : "block"
          }`}
        ></div>
      </div>
    </form>
  );
};

export default Signin;
