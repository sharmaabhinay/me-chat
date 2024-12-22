import React from 'react'

const Messages = ({message,user}) => {
  return (
    <div className=' h-[80vh] overflow-y-scroll px-10' id='ShowContacts'>
        {
            message.map((item,i)=>(
                <div key={i}>
                  <div className={`my-2 ${item.senderId != user ?'flex justify-start':'flex justify-end'}`}>
                    <span className={`p-2 rounded-full px-3 font-medium ${item.senderId != user ? 'text-black bg-gray-200' : 'text-black bg-purple-500'}`}>{item.content}</span>
                  </div>
                </div>
            ))
        }
    </div>
  )
}

export default Messages