import React, { useEffect, useRef } from 'react'

const Messages = ({message,user}) => {
  let viewScroll = useRef(null);

  useEffect(() => {
      if (viewScroll.current) {

        viewScroll.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [message]);
  return (
    <div className=' h-[70vh] overflow-y-scroll max-sm:px-2 px-10' id='ShowContacts'>
        {
            message.map((item,i)=>(
                <div key={i}>
                  <div className={`my-2 ${item.senderId != user ?'flex justify-start':'flex justify-end'}`}>
                    <span className={`p-2 rounded-full px-3 max-sm:text-sm font-medium ${item.senderId != user ? 'text-black bg-gray-200' : 'text-black bg-purple-500'}`}>{item.content}</span>
                  </div>
                </div>
            ))
        }
        <div ref={viewScroll}></div>
    </div>
  )
}

export default Messages