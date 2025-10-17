import React from 'react' 
import { useChatStore } from '../Store/useChatStore'
import ProfileHeader from '../Components/ProfileHeader'
import ActiveTabSwitch from '../Components/ActiveTabSwitch'
import ChatsList from '../Components/ChatsList'
import ContactList from '../Components/ContactList'
import ChatContainer from '../Components/ChatContainer'
import NoConversationPlaceHolder from '../Components/NoConversationPlaceHolder'


const ChatPage = () => {

  const {activeTab,selectedUser} = useChatStore()

  return (
    <div className='relative w-full  h-screen flex '>
      
      {/* Left side */}
      <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
    
        <ProfileHeader/>
        <ActiveTabSwitch/>
        
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {activeTab === "chats"?<ChatsList/>:<ContactList/>}
        </div>

      </div>

      {/* Right Side */}

      <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
      {selectedUser?<ChatContainer/>:<NoConversationPlaceHolder/>}
      </div>





    </div>
  )
}

export default ChatPage