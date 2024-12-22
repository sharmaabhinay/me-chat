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
        console.log('contact users : ', res.data.data)
        dispatch(refresh_contact_list(res.data.data))
        onClose();
      }
    }
  };
  return (
    <div
      ref={handleModal}
      onClick={closeModal}
      className="fixed w-[100vw] z-10 h-[100vh] flex justify-center items-center bg-opacity-30 backdrop-blur-sm"
    >
      <div className="flex flex-col justify-center items-center rounded-lg bg-gray-400 p-4">
        <h1 className="text-lg font-medium mb-2">Add contact</h1>
        <form
          action=""
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-3"
        >
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            type="text"
            placeholder="name"
            className="rounded-full py-2 px-4 w-[18rem] outline-none bg-gray-300"
          />
          <div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="phone"
              className="rounded-full py-2 px-4 w-[18rem] outline-none bg-gray-300"
            />
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
