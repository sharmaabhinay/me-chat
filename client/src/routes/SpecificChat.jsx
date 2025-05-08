import React, { useRef, useState, useEffect } from "react";
import Messages from "../components/Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BackendUrl from "../backendUrl";
import { refresh_contact_list } from "../redux/user/action";

const SpecificChat = ({ data, socket }) => {
  const userData = useSelector((state) => state.rootReducer.userData);
  const friend = userData.currentFriend;
  const dispatch = useDispatch();
  const [chat, setchat] = useState([]);
  const [loading, setLoading] = useState(false);
  let chatScroll = useRef(null);
  const [typing, setTyping] = useState(false);
  const typingSession = useRef(null);
  const [FriendOnline, setFriendOnline] = useState(
    data.isOnline
  );
  // console.log(friend.online_status)
  const getcontacts = async () => {
      let res = await axios.post(`${BackendUrl}/get-contacts`, {
        userId: userId,
      });
      if (res) {
        // let sortContacts = res.data.contacts.sort("date")
        dispatch(refresh_contact_list(res.data.contacts));
        // setContacts(fetchContacts);
      }
    };

  const [messages, setMessages] = useState([{}]);

  let notificationSound = useRef(new Audio("/notification.mp3"));

  const addMessage = (bdata) => {
    notificationSound.current.play();
    setMessages((prevMessages) => [...prevMessages, bdata]);
  };
  let userId = userData.id;
  useEffect(()=> {
  },[messages])
  useEffect(() => {
    socket.on("new-message", (bdata) => {
      getcontacts();
      console.log(friend)
      console.log("data : ", data._id, "friend : ", friend.id, "bdata : ", bdata.sender)
      if (data._id === bdata.sender) {
        console.log('same')
        // addMessage(bdata)
        // notificationSound.current.pause();
        // console.log(friend.id)
        addMessage(bdata)
      } else {
        console.log('not same')
      }
    });
  }, []);

  useEffect(() => {
    socket.on("frndOnline", (bdata) => {
      if (friend.id || data._id === bdata.frndId) {
        setFriendOnline(true);
      }
    });
  }, []);
  useEffect(() => {
    socket.on("leave", (bdata) => {
      if (friend.id || data._id === bdata.userId) {
        setFriendOnline(false);
      }
    });
  }, []);
  const handleOnSend = async (e) => {
    e.preventDefault();
    setchat("");
    setTyping(false);
    socket.emit("client-message", {
      senderId: userId,
      receiverId: friend.id || data._id,
      content: chat,
    });
    setMessages([
      ...messages,
      { sender: userId, receiver: friend.id, content: chat },
    ]);
    getcontacts();
  };
  let fetchMessages = async () => {
    setLoading(true);
    let res = await axios.post(`${BackendUrl}/get-messages`, {
      senderId: userId,
      receiverId: friend.id || data._id,
    });
    if (res) {
      setLoading(false);
      setMessages(res.data);
    }
  };

  useEffect(() => {
    setMessages([]);
    fetchMessages();
  }, [friend]);

  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chat.length > 0) {
      if (!typing) {
        setTyping(true);
      }
      clearTimeout(typingSession.current);
      typingSession.current = setTimeout(() => {
        setTyping(false);
      }, 1500);
    }
  }, [chat]);
  useEffect(() => {
    socket.emit("typing", {
      isTyping: typing,
      userId: userData.id,
      receiverId: friend.id || data._id,
    });
  }, [typing]);
  const handleOnInputChange = (e) => {
    setchat(e.target.value);
  };
  // useEffect(() => {
  //   socket.on("frnd-typing", (bdata) => {
  //     if (friend.id || data._d === bdata.frndId) {
  //     } else {
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     setLoading(true);
  //     let res = await axios.post(`${BackendUrl}/get-messages`, {
  //       senderId: userId,
  //       receiverId: friend.id || data._id,
  //     });
  //     if (res) {
  //       setLoading(false);
  //       setMessages((prevMessages) => [...prevMessages, ...res.data]);
  //     }
  //   };
  
  //   fetchMessages();
  // }, [friend]);

  return (
    <div className="w-auto h-full ">
      <div className="parent">
        <div className="contactInfo max-sm:w-[80%] bg-blur-sm w-[30rem] m-auto">
          <div className="bg-gray-200 text-black rounded-full items-center max-[380px]:p-2 max-[380px]:p- p-2 flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
                alt=""
                className="rounded-full border-2 p-1 border-purple-900 max-[380px]:w-[30px] w-[40px]"
              />
              <div className="flex flex-col leading-4">
                <p className="font-medium max-sm:text-md">
                  {friend.name || data.name}
                </p>
                <p
                  className={`text-xs font-medium max-sm:text-[11px] ${
                    FriendOnline ? "text-purple-900" : "text-black"
                  } `}
                >
                  {FriendOnline ? "online" : "offline"}
                </p>
              </div>
            </div>
            <div className="flex  max-sm:gap-3 gap-5">
              <i className="fa-solid fa-phone max-[380px]:text-xs"></i>
              <i className="fa-solid fa-video max-[380px]:text-xs"></i>
              <i className="fa-solid fa-circle-info max-[380px]:text-xs"></i>
            </div>
          </div>
        </div>
        <p className={`text-white text-center ${loading ? "block" : "hidden"}`}>
          connection...
        </p>
        <div className="chattings max-md:h-[72.5vh] max-sm:h-[74.7vh] max-[380px]:h-[78vh] h-[70vh]">
          <Messages
            message={messages}
            user={userId}
            frndId={data._id}
            socket={socket}
          />
          <div ref={chatScroll}></div>
        </div>
        <div className="w-[30rem] max-sm:w-[90%] m-auto bottom-5">
          <form
            action=""
            onSubmit={handleOnSend}
            className="flex justify-between items-center m-auto max-[380px]:gap-1 gap-4"
          >
            <div className="bg-white hover:text-xl duration-100 rounded-full flex items-center max-[380px]:w-8 max-[380px]:h-8 h-11 w-11 justify-center text-purple-700">
              <i className="fa-solid fa-paperclip max-[380px]:text-sm"></i>
            </div>
            <input
              type="text"
              value={chat}
              onChange={handleOnInputChange}
              placeholder="start your holy conversation..."
              className="outline-none focus:border-purple-700 max-[380px]:text-sm  border-2 rounded-full max-[380px]:py-2 py-2 px-3 w-[80%] text-black"
            />
            <div
              onClick={handleOnSend}
              className="bg-purple-700 cursor-pointer hover:text-xl duration-100 rounded-full flex items-center max-[380px]:w-8 max-[380px]:h-8 h-11 w-11 justify-center text-white"
            >
              <i className="fa-solid fa-paper-plane max-[380px]:text-sm"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpecificChat;
