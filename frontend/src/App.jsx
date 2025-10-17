import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './Pages/SignupPage'
import ChatPage from './Pages/ChatPage'
import LoginPage from './Pages/LoginPage'


const App = () => {
  
  return (
    <div className='h-screen w-full bg-slate-900 relative flex justify-center items-center p-4 overflow-hidden'>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route path='/' element={<ChatPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
      
    </div>
    
  )
}

export default App