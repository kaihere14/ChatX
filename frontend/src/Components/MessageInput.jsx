import React, { useRef, useState } from 'react'
import useKeyboardSound from "../../hooks/useKeyboardSound.js"
import { useChatStore } from '../Store/useChatStore.js';
import toast from 'react-hot-toast';
import { ImageIcon,SendIcon,XIcon } from 'lucide-react';


const MessageInput = () => {
    const {playRandomKeyStrokeSound} = useKeyboardSound()

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("")

    const fileInputRef = useRef(null)

    const {sendMessage,isSoundEnabled,setTypingStatus} = useChatStore()
    
    const handleSendMessage = (e)=>{
      e.preventDefault()
      if(!text.trim() && !imagePreview) return
      if(isSoundEnabled) playRandomKeyStrokeSound()
      sendMessage({text:text.trim(),image:imagePreview})
      setText('')
      setImagePreview('')

      if(fileInputRef.current)fileInputRef.current.value = ""
    }
    const handleChange = (e) => {
      setText(e.target.value);
      setTypingStatus(true);

      isSoundEnabled && playRandomKeyStrokeSound();

      setTimeout(() => {
        setTypingStatus(false);
      }, 1000); // 1000ms = 1 second after last keypress
    };


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    };

    const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  





    return (
      <div className="p-3 sm:p-4 border-t sticky bottom-0 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        {imagePreview && (
          <div className="max-w-3xl mx-auto mb-3 flex items-center">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                type="button"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
  
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2 sm:gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              handleChange(e)
            }}
            o
            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-3 px-4 text-base"
            placeholder="Type your message..."
            style={{ fontSize: '16px' }}
          />
  
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
  
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 py-3 transition-colors ${
              imagePreview ? "text-cyan-500" : ""
            }`}
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-3 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px]"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    );
  }

export default MessageInput