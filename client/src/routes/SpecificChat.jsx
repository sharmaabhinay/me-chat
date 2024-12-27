import React, { useRef, useState,useEffect } from "react";
import Messages from "../components/Messages";
import { useSelector } from "react-redux";
import axios from "axios";
import BackendUrl from "../backendUrl";



const SpecificChat = ({ data , socket }) => {

  const userData = useSelector((state)=> state.rootReducer.userData)
  const [conversation, setConversation] = useState([]);
  const [chat, setchat] = useState([]);
  const [temp, settemp] = useState();
  const [connectedFrnd, setConnectedFrnd] = useState("");
  const [chatSelected, setChatSelected] = useState(false);
  const [singleChat,setSingleChat] = useState({})
  let scrollToBottom = useRef();
  let chatScroll = useRef();
  // console.log('socket status from specific : ', socket)
  // const [chat, setchat] = useState();
  const [messages, setMessages] = useState([{}]);
  useEffect(()=>{
    if(chatScroll.current){
      chatScroll.current.scrollIntoView({behavior:'smooth'})
    }
  },[messages])
  
  
  
  let user = {
    name:'random'
  };
  let userId = userData.id;
  let frndsId = data._id;
  socket.on('new-message',(bdata)=> {
    if(frndsId === bdata.senderId){
      setMessages([...messages,bdata])
    }
    
  })
  socket.on('frndOnline',(bdata)=>{
    // console.log(bdata)
    if(data._id === bdata.frndId){
      data.isOnline = true;
    }
  })
  socket.on('leave',(bdata)=> {
    if(data._id === bdata.userId){
      data.isOnline = false;
    }
  })
  const handleOnSend = async (e)=> {
    e.preventDefault();
    setchat('')
    // socket.emit('')
    // let res = await axios.post(`${BackendUrl}/send-messages`, {senderId:userId,receiverId:frndsId,content:chat})
    // console.log(res)
    // var socket = socketConn();
    socket.emit('client-message',{senderId:userId,receiverId:frndsId,content:chat})
    setMessages([...messages,{senderId:userId,receiverId:frndsId,content:chat}])
    

  }
  let fetchMessages = async ()=> {
    let res = await axios.post(`${BackendUrl}/get-messages`, {senderId:userId,receiverId: frndsId})
    if(res){
      setMessages(res.data);
    }
  }

  useEffect(()=> {
    fetchMessages();
  },[data])

  useEffect(() => {
    if (scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleOnInputChange = (e)=> {
    setchat(e.target.value)
    // socket.emit('typing', {isTyping:true})
    
  }
  
  return (
    <div className="w-[77vw] h-[92vh]">
      <div className="parent">
        <div className="contactInfo w-[40%] m-auto">
          <div className="bg-gray-200 text-black rounded-full items-center p-2 flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                alt=""
                width={40}
                className="rounded-full border-2 p-1 border-purple-900"
              />
              <div className="flex flex-col leading-4">
                <p className="font-medium">{userData.currentFriend.name}</p>
                <p className={`text-xs font-medium ${data.isOnline ? 'text-purple-900' : 'text-black' } `}>{data.isOnline ? 'online' : 'offline'}</p>
              </div>
            </div>
            <div className="flex gap-5">
              <i className="fa-solid fa-phone"></i>
              <i className="fa-solid fa-video"></i>
              <i className="fa-solid fa-circle-info"></i>
            </div>
          </div>
        </div>
        <div className="chattings -translate-y-5">
          <Messages message={messages} user={userId}/>
          <div ref={chatScroll}></div>
        </div>
        <div className="fixed w-[75vw] bottom-5">
          <form
            action=""
            onSubmit={handleOnSend}
            className="flex justify-between w-[40%] m-auto gap-4"
          >
            <div className="bg-white hover:text-xl duration-100 rounded-full flex items-center w-11 justify-center text-purple-700">
              <i className="fa-solid fa-paperclip"></i>
            </div>
            <input
              type="text"
              value={chat}
              onChange={handleOnInputChange}
              placeholder="start your holy conversation..."
              className="outline-none focus:border-purple-700 border-2 rounded-full py-2 px-3 w-[80%] text-black"
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
  );
};

export default SpecificChat;
