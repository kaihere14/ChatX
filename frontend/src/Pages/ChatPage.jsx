import React from 'react' 
import { useChatStore } from '../Store/useChatStore'
import ProfileHeader from '../Components/ProfileHeader'
import ActiveTabSwitch from '../Components/ActiveTabSwitch'
import ChatsList from '../Components/ChatsList'
import ContactList from '../Components/ContactList'
import ChatContainer from '../Components/ChatContainer'
import NoConversationPlaceHolder from '../Components/NoConversationPlaceHolder'
import { ArrowLeft } from 'lucide-react'


const ChatPage = () => {

  const {activeTab,selectedUser} = useChatStore()

  return (
    <div className='relative w-full h-screen flex'>
      
      {/* Left side - Sidebar */}
      <div className={`
        ${selectedUser ? 'hidden lg:flex' : 'flex'}
        w-full lg:w-80 h-full bg-slate-800/50 backdrop-blur-sm flex-col
      `}>
    
        <ProfileHeader/>
        <ActiveTabSwitch/>
        
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {activeTab === "chats"?<ChatsList/>:<ContactList/>}
        </div>

      </div>

      {/* Right Side - Chat Area */}
      <div className={`
        ${selectedUser ? 'flex' : 'hidden lg:flex'}
        flex-1 flex-col bg-slate-900/50 backdrop-blur-sm min-w-0
      `}>
        {selectedUser ? <ChatContainer/> : <NoConversationPlaceHolder/>}
      </div>

    </div>
  )
}

export default ChatPage