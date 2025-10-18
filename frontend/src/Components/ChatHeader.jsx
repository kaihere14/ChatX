import React , {useEffect, useState} from 'react'
import { useChatStore } from '../Store/useChatStore'
import {X, ArrowLeft, Trash} from "lucide-react"
import { useAuthStore } from '../Store/useStoreAuth'

const ChatHeader = () => {
  const {selectedUser,setSelectedUser,deleteMsg} = useChatStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

const {onlineUsers} = useAuthStore()

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteMsg();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };


  return (
    <>
      <div className='w-full h-20 sm:h-20 bg-[#27223C]/50 backdrop-blur-[10px] flex justify-between items-center p-4'>
          <div className='flex items-center min-w-0 flex-1'>
            {/* Mobile back button */}
            <button 
              onClick={() => setSelectedUser(null)}
              className='lg:hidden mr-4 p-3 hover:bg-slate-700/50 rounded-lg'
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className={`avatar ${ onlineUsers.includes(selectedUser._id)? "avatar-online":"avatar-offline"}`}>
                <div className='h-12 w-12 sm:h-10 sm:w-10 rounded-full overflow-hidden'>
                  <img className='h-full w-full object-cover' src={
                          
                          selectedUser?.profilePic ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                        }alt="" />
                </div>
              </div>
              <div className='pl-3 flex flex-col justify-center min-w-0 flex-1'>
                  <h1 className='capitalize text-base sm:text-base font-medium truncate'>{selectedUser.fullName}</h1>
                  {onlineUsers.includes(selectedUser._id)?<p className='text-sm sm:text-sm text-gray-400'>Online</p>:<p className='text-sm sm:text-sm text-gray-400'>Offline</p>}
              </div>
          </div>
          <div onClick={handleDeleteClick} className='h-10 w-10 mr-2 flex items-center justify-center cursor-pointer hover:bg-slate-700/50 rounded-lg transition-colors'>
            <Trash size={20} />
          </div>
          <div onClick={()=>setSelectedUser(null)} className='h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-slate-700/50 rounded-lg transition-colors'>
            <X size={20} />
          </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                <Trash className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Messages</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete all messages with {selectedUser.fullName}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatHeader