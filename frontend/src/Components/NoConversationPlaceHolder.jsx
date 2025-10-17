import React from 'react';
import { MessageCircle } from 'lucide-react';

const NoConversationPlaceHolder = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center bg-[#1a1d2e] px-8'>
      <div className='flex flex-col items-center gap-6 max-w-md text-center'>
        {/* Icon with gradient background */}
        <div className='relative'>
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-600/20 flex items-center justify-center'>
            <MessageCircle className='w-16 h-16 text-teal-400' strokeWidth={1.5} />
          </div>
        </div>

        {/* Text content */}
        <div className='space-y-3'>
          <h2 className='text-2xl font-semibold text-white'>
            Select a conversation
          </h2>
          <p className='text-gray-400 text-base leading-relaxed'>
            Choose a contact from the sidebar to start chatting or continue a previous conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoConversationPlaceHolder;