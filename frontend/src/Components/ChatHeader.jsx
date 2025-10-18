import React , {useEffect} from 'react'
import { useChatStore } from '../Store/useChatStore'
import {X, ArrowLeft} from "lucide-react"
import { useAuthStore } from '../Store/useStoreAuth'

const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = useChatStore()

const {onlineUsers} = useAuthStore()

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className='w-full h-16 sm:h-20 bg-[#27223C]/50 backdrop-blur-[10px] flex justify-between items-center p-3 sm:p-4'>
        <div className='flex items-center min-w-0 flex-1'>
          {/* Mobile back button */}
          <button 
            onClick={() => setSelectedUser(null)}
            className='lg:hidden mr-3 p-2 hover:bg-slate-700/50 rounded-lg'
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={`avatar ${ onlineUsers.includes(selectedUser._id)? "avatar-online":"avatar-offline"}`}>
              <div className='h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden'>
                <img className='h-full w-full object-cover' src={
                        
                        selectedUser?.profilePic ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                      }alt="" />
              </div>
            </div>
            <div className='pl-2 sm:pl-3 flex flex-col justify-center min-w-0 flex-1'>
                <h1 className='capitalize text-sm sm:text-base font-medium truncate'>{selectedUser.fullName}</h1>
                {onlineUsers.includes(selectedUser._id)?<p className='text-xs sm:text-sm text-gray-400'>Online</p>:<p className='text-xs sm:text-sm text-gray-400'>Offline</p>}
            </div>
        </div>
        <div onClick={()=>setSelectedUser(null)} className='h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-slate-700/50 rounded-lg transition-colors'>
          <X size={16} className="sm:hidden" />
          <X size={20} className="hidden sm:block" />
        </div>
    </div>
  )
}

export default ChatHeader