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
    <div className='flex flex-col gap-3'>
      {allContact.map((val)=>(
        <div onClick={()=>setSelectedUser(val)} key={val._id} className='cursor-pointer w-full h-20 bg-[#431c4c] hover:bg-[#2c1830] rounded-2xl flex items-center p-4'>
          <div className='h-10 w-10 rounded-full bg-green-200 overflow-hidden '>
            <img className='h-full w-full object-cover' src={
                    
                    val?.profilePic ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                  }alt="" />
          </div>
          <div className='pl-4'>
            <h3>{val.fullName}</h3>
            <p className='text-sm text-gray-400'>send message</p>
          </div>
      </div>
      ))}

    </div>
  )
}

export default ContactList