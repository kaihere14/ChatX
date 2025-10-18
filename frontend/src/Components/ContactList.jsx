import React ,{useEffect} from 'react'
import { useChatStore } from '../Store/useChatStore'

const ContactList = () => {
  const {getAllContact,isUsersLoading,allContact,setSelectedUser}  = useChatStore()
 
  useEffect(()=>{
    getAllContact()
  },[getAllContact])

 
 if(isUsersLoading){
  return(
    <div className='h-full w-full flex justify-center items-center'>
      <span className="loading loading-spinner loading-xl mt-2"></span> 
    </div>
  )
 }
  return (
    <div className='flex flex-col gap-2 sm:gap-3'>
      {allContact.map((val)=>(
        <div onClick={()=>setSelectedUser(val)} key={val._id} className='cursor-pointer w-full h-20 bg-[#431c4c] hover:bg-[#2c1830] rounded-2xl flex items-center p-4 transition-colors'>
          <div className='h-12 w-12 rounded-full bg-green-200 overflow-hidden'>
            <img className='h-full w-full object-cover' src={
                    
                    val?.profilePic ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                  }alt="" />
          </div>
          <div className='pl-4 min-w-0 flex-1'>
            <h3 className='text-base font-medium truncate'>{val.fullName}</h3>
            <p className='text-sm text-gray-400 truncate'>send message</p>
          </div>
      </div>
      ))}

    </div>
  )
}

export default ContactList