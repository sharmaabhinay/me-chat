import React, { useState } from "react";
import { User } from "./Signup";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  let [name, setName] = useState("");
  let [about, setAbout] = useState("");
  let [email, setEmail] = useState("");
  let avatars = [
    {
      id: 1,
      src: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?t=st=1729608785~exp=1729612385~hmac=4c950adfff512b4aa0a67eb10b3626557a1a8fbd907168c9fdb341ab54b8c5fa&w=740",
    },
    {
      id: 2,
      src: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1729608909~exp=1729612509~hmac=4286594057c80e8743fb910ff357b690650bd6fdbaf26abe76b125b25a9902a5&w=740",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?t=st=1729608952~exp=1729612552~hmac=b464c8ee8d7472503d584ad054e5e3877ef44fb59efd0785f4765e8878bc0918&w=740",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1729609001~exp=1729612601~hmac=a76b23756b4bcaae37f66a321a59914ebf76235de24b1e1eba697e38580308ed&w=740",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?t=st=1729609017~exp=1729612617~hmac=8a192eadd83ed0786b1af79c9c47faa18374d466f889553d2a246469b4cc42ab&w=740",
    },
    {
      id: 3,
      src: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?t=st=1729609038~exp=1729612638~hmac=6100cb79f215c6dadc90ec6c2c3b4486f72c78c1c362fa22e3b7f28f20ba27a9&w=740",
    },
  ];
  let navigate = useNavigate()
  const submit = (e) => {
    User.name = name;
    e.preventDefault();
    navigate('/chat')
  };
  
  return (
    <div className="h-screen bg-gray-700 grid items-center justify-center">
      <div className="flex gap-2 flex-col bg-white rounded-lg w-[20rem]">
        <h1 className="text-center bg-gray-500 text-white font-bold py-3 text-2xl rounded-t-lg">
          Profile
        </h1>
        <div className="">
          <img
            src="https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
            alt=""
            className="h-20 rounded-full m-auto"
          />
          <div className="relative text-center rounded-full">
            <i className="fa-solid fa-pencil text-red-500 -translate-y-5 bg-gray-200 rounded-full p-2 translate-x-6"></i>
          </div>
        </div>
        <form action="" onSubmit={submit} className="flex p-2 flex-col gap-2">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="rounded-full outline-purple-700 border-2 p-2 px-3 bg-gray-200"
          />
          <input
            type="text"
            placeholder="about (optional)"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="rounded-full outline-purple-700 border-2 p-2 px-3 bg-gray-200"
          />
          <input
            type="text"
            placeholder="email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full outline-purple-700 border-2 p-2 px-3 bg-gray-200"
          />
          <button
            className={`bg-purple-700 w-full py-2 rounded-full text-lg ${
              name.length <= 2
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-100 cursor-pointer"
            }`}
          >
            save
          </button>
        </form>
      </div>
     
    </div>
  );
};

export default UserProfile;
