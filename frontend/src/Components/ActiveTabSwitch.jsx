import React from 'react'
import { useChatStore } from '../Store/useChatStore'

const ActiveTabSwitch = () => {
   const {setActiveTab,activeTab} =useChatStore()
  return (
    activeTab==="chats"?<div className='w-[80] flex gap-2 mt-2 mx-4 font-lg'>
    <div onClick={()=>{setActiveTab("chats")}}  className='w-1/2 bg-[#431c4c] rounded-2xl p-2 text-center  cursor-pointer'>Chats</div>
    <div onClick={()=>{setActiveTab("contacts")}} className='w-1/2 text-center p-2 cursor-pointer'>Contacts</div>
  </div>:<div className='w-[80] flex gap-2 mt-2 mx-4 font-lg'>
    <div onClick={()=>{setActiveTab("chats")}}  className='w-1/2 p-2 text-center cursor-pointer'>Chats</div>
    <div onClick={()=>{setActiveTab("contacts")}} className='w-1/2 text-center  cursor-pointer bg-[#431c4c] rounded-2xl p-2'>Contacts</div>
  </div>
  )
}

export default ActiveTabSwitch