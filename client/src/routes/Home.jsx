import React, { useEffect, useRef, useState } from "react";
import Chats from "../components/Chats";
import Chattings from "../components/Massages";
import { User } from "./Signup";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import socketConn from "../components/socketConnection";
import Welcome from "../components/Welcome";
import SpecificChat from "./SpecificChat";
import AddContact from "../components/AddContact";
import { useDispatch, useSelector } from "react-redux";
import {
  refresh_contact_list,
  set_current_friend,
  set_frnd_online,
  set_User_Data,
} from "../redux/user/action";
import axios from "axios";
import BackendUrl from "../backendUrl";

const Home = () => {
  const userData = useSelector((state) => state.rootReducer.userData);
  // const result = useSelector((state) => state.rootReducer.socket);
  // console.log("socket result : ", result);
  // console.log(userData.currentFriend.id);
  const userId = userData.id;
  // console.log(">>", userId);
  const dispatch = useDispatch();
 

  useEffect(() => {
    // console.log("homejs", userData);
    // console.log("homejs", userData.refreshContactList);
  }, [userData]);

  const [conversation, setConversation] = useState([]);
  const [chat, setchat] = useState("");
  const [temp, settemp] = useState();
  const [mobileContacts,setMobileContacts] = useState(false)
  const [connectedFrnd, setConnectedFrnd] = useState("");
  const [chatSelected, setChatSelected] = useState(false);
  const [currentFriendValue, setCurrentFriendValue] = useState("");
  const [singleChat, setSingleChat] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reusableSocket,setReusableSocket] = useState()
  const [fetchC,setFetchC] = useState(0)
  let scrollToBottom = useRef();
  let [contacts, setContacts] = useState([]);
  // console.log("single chat : ", singleChat._id);
  let fetchContacts = userData.fetchContacts;
  const getcontacts = async () => {
    let res = await axios.post(`${BackendUrl}/get-contacts`, {
      userId: userData.id,
    });
    if (res) {
      // console.log(res)
      dispatch(refresh_contact_list(res.data.contacts));
      setContacts(fetchContacts);
    }

  };
  useEffect(() => {
    getcontacts();
    setContacts(userData.fetchContacts);
  }, [fetchC]);
  useEffect(() => {
    let socket = socketConn();
    setReusableSocket(socket)
    console.log("socket from 126 : ",socket)
    socket.on("connected", (data) => {
      console.log(data);
      if (data) {
        dispatch(set_User_Data({ isOnline: true }));
      } else {
        dispatch(set_User_Data({ isOnline: false }));
      }

      socket.emit("joined", userId);
      socket.on("welcome", (data) => {
        console.log(data);
      });
      socket.on("frndOnline", (data) => {
        getcontacts()
        // console.log(
        //   "frnd id : ",
        //   userData.currentFriend.id,
        //   "online : ",
        //   data.frndId
        // );
        // console.log("single chat : ", singleChat._id);
        if (
          singleChat._id === data.frndId ||
          userData.currentFriend.id == data.frndId
        ) {
          dispatch(set_frnd_online(true));
        } else {
          dispatch(set_frnd_online(false));
        }
        // console.log(data);
      });
      socket.on('new-message',(data)=> {
        getcontacts();
      })

      socket.on("leave", (data) => {
        setSingleChat({isOnline:false})
        getcontacts()
      });
    });
  }, [0]);
  const handleOnaddContact = () => {
    alert("hello world");
  };


  useEffect(() => {
    setContacts(fetchContacts);
  }, [fetchContacts]);
  var socket;
  let user = User;

  useEffect(() => {
    if (scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  
  const handleOnSend = (e) => {
    e.preventDefault();
    
  };
  const HandleOnSelectChat = (e) => {
    setSingleChat(e);
    setMobileContacts(false)
    dispatch(
      set_current_friend({
        id: e._id,
        name: e.name,
        phone: e.phone,
        profile_pic: e.profile_pic,
      })
    );
    setChatSelected(true);
    setCurrentFriendValue(e._id);
  };
  const handleShowContacts = ()=>{
    setMobileContacts(true)
  }
  return (
    <div className="bg-gray-900 h-[100vh]" id="bg-image">
      {showModal && <AddContact onClose={() => setShowModal(false)} />}
      <p
        className="bg-purple-900 text-white font-bold max-sm:p-1 max-sm:font-medium max-sm:text-sm p-2"
        
      >
        React-Chat
      </p>
      <div className="flex justify-between pt-2 ">
        <div className="max-md:block hidden h-10 top-16 absolute w-2 z-10 rounded-e-full bg-white" onClick={handleShowContacts}></div>
        <div id="bg-image" className={` flex flex-col gap-2 absolute w-full bg-gray-900 z-10 ${mobileContacts ? 'block':'hidden'}`}>
          <div className="px-2 pe-5 py-1 bg-gray-200 rounded-e-full flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                width={45}
                className="rounded-full"
              />
              <p>{userData.name}</p>
            </div>
            <div className="cursor-pointer">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 overflow-y-scroll h-[82.4vh]"
            id="ShowContacts"
          >
            {contacts.map((contact, i) => (
              <div
                key={i}
                onClick={() => HandleOnSelectChat(contact)}
                className={`flex items-center justify-between p-2 border-2 border-gray-400 rounded-full hover:translate-x-2  duration-300 cursor-pointer ${
                  currentFriendValue === contact._id
                    ? "border-purple-700"
                    : null
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                  <img
                    src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                    alt=""
                    width={40}
                    className="rounded-full"
                  />
                  <div className={`h-3 w-3 rounded-full -translate-x-3 ${contact.isOnline ? 'bg-green-700':null}`}></div>
                  </div>
                  <div className="leading-4">
                    <h1 className="font-medium text-gray-300">
                      {contact.name}
                    </h1>
                    <p className="text-sm text-purple-100">{contact.last_message ? contact.last_message : null}</p>
                  </div>
                </div>
                <div className="leading-4 flex flex-col items-center">
                  <p className="text-sm text-white hidden">11:30</p>
                  <span className="text-sm bg-purple-700 hidden rounded-full font-medium text-white px-2">
                    6
                  </span>
                </div>
              </div>
            )) || <p className="text-white">Loading...</p>}
            <p className={`text-white ${fetchContacts.length == 0 ? 'block':'hidden'}`}>no contacts</p>
            
            <div onClick={()=> setShowModal(!showModal)} className="absolute right-10 hover:text-purple-800 delay-75 bottom-10 cursor-pointer bg-white rounded-full p-2 px-[.6rem]">
            <i class="fa-solid fa-user-plus text-lg"></i>
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-2  max-md:hidden w-[17rem]">
          <div className="px-2 pe-5 py-1 bg-gray-200 rounded-e-full flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                width={45}
                className="rounded-full"
              />
              <p className="">{userData.name}</p>
            </div>
            <div className="cursor-pointer">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 overflow-y-scroll h-[80vh]"
            id="ShowContacts"
          >
            {contacts.map((contact, i) => (
              <div
                key={i}
                onClick={() => HandleOnSelectChat(contact)}
                className={`flex items-center justify-between p-2 border-2 border-gray-400 rounded-full hover:translate-x-2 duration-300 cursor-pointer ${
                  currentFriendValue === contact._id
                    ? "border-purple-700"
                    : null
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                  <img
                    src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                    alt=""
                    width={40}
                    className="rounded-full"
                  />
                  <div className={`h-3 w-3 rounded-full -translate-x-3 ${contact.isOnline ? 'bg-green-700':null}`}></div>
                  </div>
                  <div className="leading-4">
                    <h1 className="font-medium text-gray-300">
                      {contact.name}
                    </h1>
                    <p className="text-sm text-purple-100">{contact.last_message ? contact.last_message : null}</p>
                  </div>
                </div>
                <div className="leading-4 flex flex-col items-center">
                  <p className="text-sm text-white hidden">11:30</p>
                  <span className="text-sm bg-purple-700 hidden rounded-full font-medium text-white px-2">
                    6
                  </span>
                </div>
              </div>
            )) || <p className="text-white">contact list are empty</p>}
            
            <div onClick={()=> setShowModal(!showModal)} className="absolute left-[10rem] hover:text-purple-800 delay-75 bottom-10 cursor-pointer bg-white rounded-full p-2 px-[.6rem]">
            <i class="fa-solid fa-user-plus text-lg"></i>
            </div>
          </div>
        </div>
        <div className="text-white z-0 w-[100%]">
          {!chatSelected ? <Welcome /> : <SpecificChat data={singleChat} socket={reusableSocket}/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
