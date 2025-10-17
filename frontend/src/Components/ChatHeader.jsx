import React , {useEffect} from 'react'
import { useChatStore } from '../Store/useChatStore'
import {X} from "lucide-react"

const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = useChatStore()
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
            <div className='avatar avatar-online'>
                <div className=' h-13 w-13 rounded-full overflow-hidden'>
                <img className='h-full w-full object-cover' src={
                        selectedUser?.profilePic ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                        }alt="" />
                </div>
            </div>
            <div className='pl-3 flex flex-col justify-center '>
                <h1 className='capitalize'>{selectedUser.fullName}</h1>
                <p className='text-sm text-gray-400'>Online</p>
            </div>
        </div>
        <div onClick={()=>setSelectedUser(null)} className=' h-1 pb-4 pr-4 pl-4 cursor-pointer'>
          <X />
        </div>
    </div>
  )
}

export default ChatHeader