import React, { useEffect, useRef, useState } from "react";
import Chats from "../components/Chats";
import Chattings from "../components/Massages";
import { User } from "./Signup";
// import { bg_color } from '../assets/properties'
// import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketConn from "../components/socketConnection";


import socketIO from "socket.io-client";
import Welcome from "../components/Welcome";
import SpecificChat from "./SpecificChat";
import AddContact from "../components/AddContact";
let user = {
  name:'compounder'
}
const Home = () => {
  var socket = socketConn();
  useEffect(()=> {
    socket.on('connected',(data)=> {
      console.log(data)
      socket.emit('joined',{user})
      socket.on('welcome',(data)=>{
        console.log(data)
      })
    })
  },[])
  const [conversation, setConversation] = useState([]);
  const [chat, setchat] = useState("");
  const [temp, settemp] = useState();
  const [connectedFrnd, setConnectedFrnd] = useState("");
  const [chatSelected, setChatSelected] = useState(false);
  const [singleChat,setSingleChat] = useState({})
  let scrollToBottom = useRef();
  let contacts = [
    {name:'Batman',Phone:4545, messageCount : 2 , messageContent:'hellow' , time: '11:35'},
    {name:'Spiderman',Phone:4545, messageCount : 5 , messageContent:'hellow' , time: '11:35'},
    {name:'Padman',Phone:4545, messageCount : 1 , messageContent:'hellow' , time: '11:35'},
    {name:'Snoopdog',Phone:4545, messageCount : 4 , messageContent:'hellow' , time: '11:35'},
    {name:'Venom',Phone:4545, messageCount : 12 , messageContent:'hellow' , time: '11:35'},
    {name:'Dr. doom',Phone:4545, messageCount : 2 , messageContent:'hellow' , time: '11:35'},
    {name:'Shazam',Phone:4545, messageCount : 4 , messageContent:'hellow' , time: '11:35'},
    {name:'Flash',Phone:4545, messageCount : 1 , messageContent:'hellow' , time: '11:35'},
    {name:'Professor',Phone:4545, messageCount : 2 , messageContent:'hellow' , time: '11:35'},
    {name:'Berlin',Phone:4545, messageCount : 3 , messageContent:'hellow' , time: '11:35'},
    {name:'Tokyo',Phone:4545, messageCount : 3 , messageContent:'hellow' , time: '11:35'},
  ]
  const handleOnaddContact = ()=> {
    alert('hello world')
  }
  
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
  const HandleOnSelectChat = (e)=> {
    setSingleChat(e)
    setChatSelected(true)
  }
  return (
    <div className="bg-gray-900 h-[100vh]">
      {/* <AddContact /> */}
      <p className="bg-purple-900 text-white font-bold p-2" onClick={()=> console.log(singleChat)}>React-Chat</p>
      <div className="flex mt-2">
        <div className="w-[33%] flex flex-col gap-2">
          <div className="px-2 py-1 bg-gray-200 rounded-e-full flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                width={45}
                className="rounded-full"
              />
              <p>Developer</p>
            </div>
            <div>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-y-scroll h-[82vh]" id="ShowContacts">
            {contacts.map((contact, i) => (
              <div key={i} onClick={()=> HandleOnSelectChat(contact)} className="flex items-center justify-between p-2 border-2 border-gray-400 rounded-full hover:border-purple-700  cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                    alt=""
                    width={40}
                    className="rounded-full"
                  />
                  <div className="leading-4">
                    <h1 className="font-medium text-gray-300">{contact.name}</h1>
                    <p className="text-sm text-purple-100">{contact.messageContent}</p>
                  </div>
                </div>
                <div className="leading-4 flex flex-col items-center">
                  <p className="text-sm text-white">{contact.time}</p>
                  <span className="text-sm bg-purple-700 rounded-full font-medium text-white px-2">
                    {contact.messageCount}
                  </span>
                </div>
              </div>
            ))}
            <div className="fixedd cursor-pointer w-[21vw] bg-white flex justify-end" onClick={handleOnaddContact}>
              <div className="text-red-400 box-shadow-2 fixed bottom-10 bg-white rounded-full p-4">
                <p>➕</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white w-77%">
          {!chatSelected ? <Welcome /> : <SpecificChat data={singleChat}/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
