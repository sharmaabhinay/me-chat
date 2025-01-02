import React, { useEffect, useRef, useState } from "react";

const Messages = ({ message, user, socket, frndId }) => {
  let viewScroll = useRef(null);
  let [typing, setTyping] = useState(false);
  useEffect(() => {
    socket.on(
      "frnd-typing",
      (data) => {
        // console.log(data)
        if (data.frndId === frndId) {
          setTyping(data.isTyping);
        }
      },
      []
    );
  });
  useEffect(() => {
    if (viewScroll.current) {
      viewScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message,typing]);
  return (
    <div
      className=" h-full max-sm:h-[79vh] overflow-y-scroll max-sm:px-2 px-10"
      id="ShowContacts"
    >
      {message.map((item, i) => (
        <div key={i}>
          <div
            className={`my-2 ${
              item.senderId != user ? "flex justify-start" : "flex justify-end"
            }`}
          >
            <span
              className={`p-2 rounded-full px-3 max-sm:text-sm font-medium ${
                item.senderId != user
                  ? "text-black bg-gray-200"
                  : "text-black bg-purple-500"
              }`}
            >
              {item.content}
            </span>
          </div>
        </div>
      ))}
      <div className={`my-2 ${typing ? "block" : "hidden"}`}>
        <div className="bg-gray-200 rounded-full p-2 w-16  flex justify-center">
          <div
            className={`loader w-[40px] max-md:w-[30px]`}
          ></div>
        </div>
      </div>
      <div ref={viewScroll}></div>
    </div>
  );
};

export default Messages;
