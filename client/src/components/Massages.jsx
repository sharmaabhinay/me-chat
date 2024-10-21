import React from "react";
import { User } from "../routes/Signup";
const Chattings = ({ sentBy, Messaged }) => {
  return (
    <>
      <div className={` my-1 ${sentBy != User ? 'text-start':'text-end'}`}><p className={`p-2 text-start leading-4 text-sm max-w-[60%] px-4 inline-block rounded-full font-medium ${sentBy != User ? 'bg-purple-400':'bg-gray-200'}`}>{sentBy != User ? `${sentBy} : ` : null}  {Messaged}</p></div>
    </>
  );
};

export default Chattings;
