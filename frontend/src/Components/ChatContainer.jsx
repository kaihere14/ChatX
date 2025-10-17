import React from 'react'
import { useChatStore } from '../Store/useChatStore'

const ChatContainer = () => {
  const {selectedUser} = useChatStore()
  return (
    <div>ChatContainer</div>
  )
}

export default ChatContainer