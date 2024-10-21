import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export let User;
const Signup = () => {
  let navigate = useNavigate()
  let [name,setName] = useState('')
  const SubmitData = (e)=>{
    e.preventDefault()
    User = name;
    navigate('/chat')
    // alert(User)
  }
  return (
    <div>
      <form action="" onSubmit={SubmitData}>
        <input type="text" autoFocus placeholder='type name' onChange={(e)=> setName(e.target.value)} className='outline-none border-2 border-purple-700 focus:border-4'/>
        <button className='bg-purple-700'>submit</button>
      </form>
    </div>
  )
}

export default Signup