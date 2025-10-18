import React , {useEffect} from 'react'
import { useChatStore } from '../Store/useChatStore'
import {X} from "lucide-react"
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
    <div className='w-full h-20 bg-[#27223C]/50 backdrop-blur-[10px] flex justify-between items-center p-4'>
        <div className='flex'>
        <div className={`avatar  ${ onlineUsers.includes(selectedUser._id)? "avatar-online":"avatar-offline"}`}>
              <div className='h-10 w-10 rounded-full  overflow-hidden '>
                <img className='h-full w-full object-cover' src={
                        
                        selectedUser?.profilePic ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                      }alt="" />
              </div>
            </div>
            <div className='pl-3 flex flex-col justify-center '>
                <h1 className='capitalize'>{selectedUser.fullName}</h1>
                {onlineUsers.includes(selectedUser._id)?<p className='text-sm text-gray-400'>Online</p>:<p className='text-sm text-gray-400'>Offline</p>}
            </div>
        </div>
        <div onClick={()=>setSelectedUser(null)} className=' h-1 pb-4 pr-4 pl-4 cursor-pointer'>
          <X />
        </div>
    </div>
  )
}

export default ChatHeader