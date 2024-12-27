import React, { useEffect, useRef, useState } from "react";
import Chats from "../components/Chats";
import Chattings from "../components/Massages";
import { User } from "./Signup";
// import { bg_color } from '../assets/properties'
// import ReactScrollToBottom from 'react-scroll-to-bottom';
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
  const [connectedFrnd, setConnectedFrnd] = useState("");
  const [chatSelected, setChatSelected] = useState(false);
  const [currentFriendValue, setCurrentFriendValue] = useState("");
  const [singleChat, setSingleChat] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reusableSocket,setReusableSocket] = useState()
  const [fetchC,setFetchC] = useState(0)
  let scrollToBottom = useRef();
  let [contacts, setContacts] = useState([
    {
      name: "Batman",
      Phone: 4545,
      messageCount: 2,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Spiderman",
      Phone: 4545,
      messageCount: 5,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Padman",
      Phone: 4545,
      messageCount: 1,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Snoopdog",
      Phone: 4545,
      messageCount: 4,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Venom",
      Phone: 4545,
      messageCount: 12,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Dr. doom",
      Phone: 4545,
      messageCount: 2,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Shazam",
      Phone: 4545,
      messageCount: 4,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Flash",
      Phone: 4545,
      messageCount: 1,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Professor",
      Phone: 4545,
      messageCount: 2,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Berlin",
      Phone: 4545,
      messageCount: 3,
      messageContent: "hellow",
      time: "11:35",
    },
    {
      name: "Tokyo",
      Phone: 4545,
      messageCount: 3,
      messageContent: "hellow",
      time: "11:35",
    },
  ]);
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
    // console.log("socket from 126 : ",socket)
    socket.on("connected", (data) => {
      // console.log(data);
      if (data) {
        dispatch(set_User_Data({ isOnline: true }));
      } else {
        dispatch(set_User_Data({ isOnline: false }));
      }

      socket.emit("joined", userId);
      socket.on("welcome", (data) => {
        // console.log(data);
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
  // const socketFun = () => {
  //   const ENDPOINT = LocalUrl;
  //   socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  //   settemp(socket);
  //   socket.on("connect", () => {
  //     console.log("colient connected");
  //     // console.log(socket);
  //     // setSocket(socket)
  //   });

  //   socket.emit("joined", { user });
  //   socket.on("userJoined", (data) => {
  //     // console.log(data.message);
  //     setConversation((p) => [...p, data]);
  //     setConnectedFrnd(data.user.name);
  //     console.log(connectedFrnd);
  //   });
  //   socket.on("welcome", (data) => {
  //     // setChats([...chats, data]);
  //     setConversation((p) => [...p, data]);
  //   });
  //   socket.on("leave", (data) => {
  //     console.log(data);
  //     setConversation((p) => [...p, data]);
  //   });
  //   socket.on("new-massage", (data) => {
  //     setConversation((p) => [...p, data]);
  //     // console.log(conversation)
  //   });
  // };
  // useEffect(() => {
  //   console.log(user);
  //   socketFun();
  //   console.log(conversation);
  // }, [user]);
  const handleOnSend = (e) => {
    e.preventDefault();
    // console.log(temp)
    // alert(chat)
    // if (chat.length < 1) {
    //   alert("message can't be empty");
    // } else {
    //   setchat("");
    //   if (temp) {
    //     temp.emit("message-send", { user, message: chat });
    //   } else {
    //     console.log("socket no initiated");
    //   }
    // }
  };
  const HandleOnSelectChat = (e) => {
    setSingleChat(e);
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
  return (
    <div className="bg-gray-900 h-[100vh]" id="bg-image">
      {showModal && <AddContact onClose={() => setShowModal(false)} />}
      <p
        className="bg-purple-900 text-white font-bold p-2"
        onClick={() => dispatch(set_frnd_online(true))}
      >
        React-Chat
      </p>
      <div className="flex mt-2 backdrop-blur-sm">
        <div className="w-[33%] flex flex-col gap-2">
          <div className="px-2 py-1 bg-gray-200 rounded-e-full flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                width={45}
                className="rounded-full"
              />
              <p>{userData.name}</p>
            </div>
            <div>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 overflow-y-scroll h-[82vh]"
            id="ShowContacts"
          >
            {contacts.map((contact, i) => (
              <div
                key={i}
                onClick={() => HandleOnSelectChat(contact)}
                className={`flex items-center justify-between p-2 border-2 border-gray-400 rounded-full hover:translate-x-2 z-2 duration-300 cursor-pointer ${
                  currentFriendValue === contact._id
                    ? "border-purple-700"
                    : null
                }`}
              >
                <div className="flex items-center gap-3">
                  <div >
                  <img
                    src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                    alt=""
                    width={40}
                    className="rounded-full"
                  />
                  <div className={`h-3 w-3 bg-green-700 rounded-full -translate-y-10 ${contact.isOnline ? 'block':'hidden'}`}></div>
                  </div>
                  <div className="leading-4">
                    <h1 className="font-medium text-gray-300">
                      {contact.name}
                    </h1>
                    <p className="text-sm text-purple-100">{contact.last_message ? contact.last_message : 'Hello'}</p>
                  </div>
                </div>
                <div className="leading-4 flex flex-col items-center">
                  <p className="text-sm text-white">11:30</p>
                  <span className="text-sm bg-purple-700 rounded-full font-medium text-white px-2">
                    6
                  </span>
                </div>
              </div>
            ))}
            <div
              className="fixedd cursor-pointer w-[21vw] bg-white flex justify-end"
              onClick={() => setShowModal(!showModal)}
            >
              <div
                className={`text-red-400 box-shadow-2 fixed bottom-10 bg-white rounded-full p-4 ${
                  showModal ? "rotate-45" : null
                }`}
              >
                <p>➕</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white z-0 w-77%">
          {!chatSelected ? <Welcome /> : <SpecificChat data={singleChat} socket={reusableSocket}/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
