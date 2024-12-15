import React, { useRef, useState,useEffect } from "react";
import Messages from "../components/Messages";



const SpecificChat = ({ data }) => {
  const [conversation, setConversation] = useState([]);
  const [chat, setchat] = useState([]);
  const [temp, settemp] = useState();
  const [connectedFrnd, setConnectedFrnd] = useState("");
  const [chatSelected, setChatSelected] = useState(false);
  const [singleChat,setSingleChat] = useState({})
  let scrollToBottom = useRef();
  let chatScroll = useRef();
  
  // const [chat, setchat] = useState();
  const [messages, setMessages] = useState([
    { sendBy: "f", message: "Hii", time: "12:32" },
    { sendBy: "me", message: "Hello", time: "12:32" },
    { sendBy: "f", message: "How are you", time: "12:32" },
    { sendBy: "me", message: "Kaun", time: "12:32" },
    { sendBy: "me", message: "?", time: "12:32" },
    { sendBy: "f", message: "Nai pehchana?", time: "12:32" },
    { sendBy: "me", message: "Jb hi to puchha", time: "12:32" },
    { sendBy: "me", message: "Kaun", time: "12:32" },
    { sendBy: "me", message: "?", time: "12:32" },
    { sendBy: "f", message: "Nai pehchana?", time: "12:32" },
    { sendBy: "me", message: "Jb hi to puchha", time: "12:32" },
    { sendBy: "me", message: "Kaun", time: "12:32" },
    { sendBy: "me", message: "?", time: "12:32" },
    { sendBy: "f", message: "Nai pehchana?", time: "12:32" },
    { sendBy: "me", message: "Jb hi to puchha", time: "12:32" },
    { sendBy: "me", message: "Kaun", time: "12:32" },
    { sendBy: "me", message: "?", time: "12:32" },
    { sendBy: "f", message: "Nai pehchana?", time: "12:32" },
    { sendBy: "me", message: "Jb hi to puchha", time: "12:32" },
    { sendBy: "me", message: "Kaun", time: "12:32" },
    { sendBy: "me", message: "?", time: "12:32" },
    { sendBy: "f", message: "Nai pehchana?", time: "12:32" },
    { sendBy: "me", message: "Jb hi to puchha", time: "12:32" },
  ]);
  const handleOnSend = ()=> {

  }
  useEffect(()=>{
    if(chatScroll.current){
      chatScroll.current.scrollIntoView({behavior:'smooth'})
    }
  },[messages])



  let user = {
    name:'random'
  }

  useEffect(() => {
    if (scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  
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
                <p className="font-medium" onClick={()=> console.log(messages)}>{data.name}</p>
                <p className="text-xs font-medium text-purple-900">Online</p>
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
          <Messages data={conversation} />
          <div ref={chatScroll}></div>
        </div>
        <div className="fixed w-[80vw] bottom-5">
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
              onChange={(e) => setchat(e.target.value)}
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
