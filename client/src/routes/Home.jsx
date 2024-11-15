import React, { useEffect, useRef, useState } from "react";
import Chats from "../components/Chats";
import Chattings from "../components/Massages";
import { User } from "./Signup";
// import { bg_color } from '../assets/properties'
// import ReactScrollToBottom from 'react-scroll-to-bottom';
export let  BcUrl = 'https://chat-app-backend-phi-azure.vercel.app/'
export let LocalUrl = 'http://localhost:4300/'
import socketIO from "socket.io-client";

const Home = () => {
 
  const [conversation, setConversation] = useState([]);
  const [chat, setchat] = useState("");
  const [temp, settemp] = useState();
  const [connectedFrnd, setConnectedFrnd] = useState("");
  let scrollToBottom = useRef()

  var socket;
  let user = User;
 

  useEffect(()=>{
    if(scrollToBottom.current){
      scrollToBottom.current.scrollIntoView({behavior: 'smooth'})
    }
  },[conversation])
  const socketFun = () => {
    const ENDPOINT = LocalUrl;
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    settemp(socket);
    socket.on("connect", () => {
      console.log("colient connected");
      // console.log(socket);
      // setSocket(socket)
    });

    socket.emit("joined", { user });
    socket.on("userJoined", (data) => {
      // console.log(data.message);
      setConversation((p) => [...p, data]);
      setConnectedFrnd(data.user.name);
      console.log(connectedFrnd);
    });
    socket.on("welcome", (data) => {
      // setChats([...chats, data]);
      setConversation((p) => [...p, data]);
    });
    socket.on("leave", (data) => {
      console.log(data);
      setConversation((p) => [...p, data]);
    });
    socket.on("new-massage", (data) => {
      setConversation((p) => [...p, data]);
      // console.log(conversation)
    });
  };
  useEffect(() => {
    console.log(user)
    socketFun();
    console.log(conversation);
  }, [user]);
  const handleOnSend = (e) => {
    e.preventDefault();
    // console.log(temp)
    // alert(chat)
    if (chat.length < 1) {
      alert("message can't be empty");
    } else {
      setchat("");
      if (temp) {
        temp.emit("message-send", { user, message: chat });
      } else {
        console.log("socket no initiated");
      }
    }
  };
  return (
    <div className="fixed bg-gray-900 h-[100vh]">
      <h1 className=" font-medium bg-purple-700 p-2" onClick={()=> console.log(conversation)}>me-chat</h1>
      <div
        className="grid-parent mt-2"
        style={{ display: "grid", gridTemplateColumns: "auto auto" }}
      >
        <div className="w-[20vw] bg-gray-200 rounded-e-full">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                alt=""
                width={40}
                className="rounded-full"
              />
              <h1 className="font-bold">{user.name}</h1>
            </div>
            <div className="cursor-pointer">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>
        <div className="w-[80vw]">
          <div className="">
            {/* <div className="bg-gray-900 " id="message-desapear"> */}
            <div className="flex items-center w-[40%] bg-gray-300 rounded-3xl px-3 py-1 m-auto justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                  alt=""
                  width={40}
                  className="rounded-full border-2 p-px border-purple-700"
                />
                <div className="leading-4">
                  <h1 className="font-medium">Testing Jio</h1>
                  <span
                    className="text-sm text-purple-700 font-medium"
                    onClick={() => console.log(conversation)}
                  >
                    online
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <i className="fa-solid fa-phone"></i>
                <i className="fa-solid fa-video"></i>
                <i className="fa-solid fa-circle-info"></i>
              </div>
            </div>
            {/* </div> */}

            <div>
              <div
                className="fixed   w-[80vw] overflow-auto h-[75vh]"
                id="Chats"
              >
                <div className="w-[80%] m-auto">
                  {conversation &&
                    conversation.map((item, i) => (
                      <Chattings
                        sentBy={item.user}
                        Messaged={item.message}
                        key={i}
                      />
                    ))}
                    <div ref={scrollToBottom}></div>
                </div>
              </div>
              <div className="fixed w-[80vw] bottom-5">
                <form
                  action=""
                  onSubmit={handleOnSend}
                  className="flex justify-between w-[40%] m-auto"
                >
                  <div className="bg-white hover:text-xl duration-100 rounded-full flex items-center w-11 justify-center text-purple-700">
                    <i className="fa-solid fa-paperclip"></i>
                  </div>
                  <input
                    type="text"
                    value={chat}
                    onChange={(e) => setchat(e.target.value)}
                    placeholder="start your holy conversation..."
                    className="outline-none focus:border-purple-700 border-2 rounded-full py-2 px-3 w-[80%]"
                  />
                  <div
                    onClick={handleOnSend}
                    className="bg-purple-700 cursor-pointer hover:text-xl duration-100 rounded-full flex items-center w-11 justify-center text-white"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20vw] focus:overscroll-contain chat-parent h-[84.8vh] overflow-y-scroll flex flex-col gap-2 mt-2">
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
          <Chats />
        </div>
        {/* <div className="w-[80vw] flex flex-col justify-between">
          <div className="messages w-[90%] mx-auto">
            {messages.map((item, i) => (
              <>
                <Chattings sentBy={item.sentBy} Messaged={item.messaged}/>
              </>
            ))}
          </div>
          <div className="bottom-8 relative ">
            <div className="flex justify-between w-[40%] m-auto">
              <div className="bg-white hover:text-xl duration-100 rounded-full flex items-center w-11 justify-center text-purple-700">
                <i class="fa-solid fa-paperclip"></i>
              </div>
              <input
                type="text"
                placeholder="start your holy conversation..."
                className="outline-none focus:border-purple-700 border-2 rounded-full py-2 px-3 w-[80%]"
              />
              <div className="bg-purple-700 hover:text-xl duration-100 rounded-full flex items-center w-11 justify-center text-white">
                <i class="fa-solid fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <p>hello world</p>
    </div>
  );
};

export default Home;
