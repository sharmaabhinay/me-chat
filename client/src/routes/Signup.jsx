import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
export let User = {name:'',
  phone:'',
  email:''
}
const Signup = () => {
  let navigate = useNavigate();
  let [number, setNumber] = useState("");
  let [otp, setOtp] = useState("");
  let [isSpin, setIsSpin] = useState(false);
  let [isOtpSent,setisOtpSent] = useState(false)
  let otpRef = useRef();
  const verifyOtp = (e) => {
    // e.preventDefault();
    setIsSpin(true)
    setTimeout(() => {
      setIsSpin(false)
      alert("verified successfully");
      navigate("/user"); 
    },1000);
  };
  
  useEffect(() => {
    if (otp.length == 6) {
      verifyOtp()
    }else if(!isOtpSent){
      // alert('please send the otp')
    }else{
      
    }
  }, [otp]);
  const sendOtp = (e) => {
    e.preventDefault();
    User = number;
    if (number.length <= 9) {
      alert("invalid phone number");
    } else {
      setisOtpSent(true)
      alert("otp sent");
      otpRef.focus();
    }
  };
  return (
    <div className="h-screen bg-gray-700 grid items-center justify-center">
      <div className="border-2 flex flex-col gap-5 rounded-lg border-white bg-gray-600">
        <div className="text-center shadow-2xl bg-gray-400 py-4">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-messenger-icon.png"
            alt=""
            className="max-w-16 m-auto"
          />
        </div>
        <form action="" onSubmit={sendOtp} className="px-3">
          <input
            type="tel"
            autoFocus
            placeholder="phone number"
            maxLength={10}
            onChange={(e) => setNumber(e.target.value)}
            className="outline-none rounded-s-full py-2 text-gray-500 font-bold px-4 "
          />
          <button
          type="submit"
            className={`bg-purple-700 rounded-e-full font-bold py-2 px-4 ${
              number.length <= 9
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-gray-100"
            }`}
          >
            send Otp
          </button>
        </form>
        <form
          action=""
          onSubmit={verifyOtp}
          className="px-4 flex flex-col gap-5 mb-5"
        >
          {/* <OtpInput
            ref={otpRef}
            inputType="tel"
            containerStyle={"flex justify-center gap-3"}
            inputStyle={
              "outline-none text-center rounded-sm text-xl text-blue-500"
            }
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className=""></span>}
            renderInput={(props) => <input {...props} />}
          /> */}
          <div
            onClick={verifyOtp}
            className={`text-lg text-center flex justify-center items-center gap-3 rounded-full py-2 font-bold ${
              otp.length <= 5
                ? "bg-purple-700 text-gray-300 cursor-not-allowed"
                : "bg-purple-700 cursor-pointer text-white"
            }`}
          >
            <span>verify</span>
            <div
              className={`h-4 w-4 border-s-4 animate-spin border-t-2 border-b-2 rounded-full ${
                isSpin ? "block" : "hidden"
              }`}
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
