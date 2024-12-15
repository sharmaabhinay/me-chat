import React from 'react'

const Messages = ({data}) => {
  return (
    <div className=' h-[80vh] overflow-y-scroll px-10' id='ShowContacts'>
        {
            data.map((item,i)=>(
                <div key={i}>
                  <div className={`my-2 ${item.sentBy == 'f' ? 'flex justify-start':'flex justify-end'}`}>
                    <span className={`p-2 rounded-full px-3 font-medium ${item.sentBy == 'f' ? 'text-black bg-gray-200' : 'text-black bg-purple-500'}`}>{item.message}</span>
                  </div>
                </div>
            ))
        }
    </div>
  )
}

export default Messages