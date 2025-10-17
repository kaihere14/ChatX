import React from 'react'
import { useChatStore } from '../Store/useChatStore'

const ActiveTabSwitch = () => {
  const { setActiveTab, activeTab } = useChatStore()
  
  return (
    <div className='w-4/5 flex gap-2 mt-2 mx-4 ml-8 text-lg'>
      <div 
        onClick={() => setActiveTab("chats")}  
        className={`w-1/2 p-2 text-center cursor-pointer rounded-2xl transition-colors ${
          activeTab === "chats" ? 'bg-[#431c4c]' : ''
        }`}
      >
        Chats
      </div>
      <div 
        onClick={() => setActiveTab("contacts")} 
        className={`w-1/2 p-2 text-center cursor-pointer rounded-2xl transition-colors ${
          activeTab === "contacts" ? 'bg-[#431c4c]' : ''
        }`}
      >
        Contacts
      </div>
    </div>
  )
}

export default ActiveTabSwitch