import React ,{useEffect, useRef} from 'react'
import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/useStoreAuth'
import ChatHeader from './ChatHeader'
import NoChatHistoryPlaceholder from './NoChat'
import Msginput from './Msginput'
import PageLoader from './Pageloader'
import MessagesLoadingSkeleton from './MessagesloadingSkelton'
import MessageInput from './MessageInput'



const ChatContainer = () => {
  const {selectedUser,messages,getMessage,isMessagesLoading,subscribeToMessage,unsubscribeFromMessages} = useChatStore()
  const {authUser}= useAuthStore()
  const messagesEndRef = useRef(null)


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    getMessage(selectedUser._id)
    subscribeToMessage()

    return ()=>{
      unsubscribeFromMessages()
    }
  },[selectedUser,getMessage,subscribeToMessage,unsubscribeFromMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])




return (
  <>
    <ChatHeader />
    {messages.length > 0 &&!isMessagesLoading ? (
      <div className="w-full h-full p-4 mx-auto space-y-6 overflow-y-auto">
        
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble mt-5 relative bottom-10 ${
                msg.senderId === authUser._id
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
              >
                {msg.image && (
                <img
                  src={msg.image}
                  alt="Shared"
                  className="rounded-lg h-48 object-cover"
                />
              )}
              {msg.text && <p className="mt-2">{msg.text}</p>}
              
              <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              
            </div>
          </div>
         ))}
         <div ref={messagesEndRef} />
       </div>
    ) :isMessagesLoading?(<MessagesLoadingSkeleton/>) :(
      <NoChatHistoryPlaceholder name={selectedUser.fullName} />
    )}

    <MessageInput/>

  </>
);
}
export default ChatContainer