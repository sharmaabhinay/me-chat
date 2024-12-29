import axios from "axios";
import React, { useRef, useState } from "react";
import BackendUrl from "../backendUrl";
import { useDispatch, useSelector } from "react-redux";
import { refresh_contact_list } from "../redux/user/action";

const AddContact = ({ onClose }) => {
  const userData = useSelector((state) => state.rootReducer.userData);
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const handleModal = useRef();
  const closeModal = (e) => {
    if (handleModal.current === e.target) {
      onClose();
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(phone.length < 3){
      setError('Invalid phone number')
    }else{

      let userId = userData.id;
      let res = await axios.post(`${BackendUrl}/add-to-contact`, {
        name: contactName,
        phone: phone,
        userId: userId,
      });
      if (res.data == "user not found") {
        setError("User not found");
      } else {
        alert("user added");
        let res = await axios.post(`${BackendUrl}/get-contacts`, {
          userId: userData.id
        });
        if(res){
          dispatch(refresh_contact_list(res.data.contacts))
          onClose();
        }
      }
    }
  };
  return (
    <div
      ref={handleModal}
      onClick={closeModal}
      className="fixed w-[100vw] z-20 h-[100vh]  bg-opacity-30 backdrop-blur-sm"
    >
      <div className="flex mt-10 max-[480px]:w-[90%] w-[25rem] border-b-2 m-auto flex-col justify-center items-center rounded-lg bg-gray-900 p-4">
        <h1 className="text-lg font-medium mb-2 text-white">Add contact</h1>
        <form
          action=""
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-3"
        >
          {/* <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            type="text"
            placeholder="name"
            className="rounded-full py-2 px-4 w-[18rem] outline-none bg-gray-300"
          /> */}
          <div>
            <div className="flex">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              autoFocus
              placeholder="phone"
              className="rounded-full py-2 px-4 max-[480px]:w-[98%] w-[18rem] outline-none bg-gray-300"
            />
            {/* <i class="fa-solid fa-phone-flip text-white"></i> */}
            </div>
            <p className="px-4 text-red-900 text-sm">{error}</p>
          </div>
          <button
            type="submit"
            className="bg-purple-700 rounded-full p-2 font-medium text-white"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
