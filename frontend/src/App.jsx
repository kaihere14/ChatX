import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import ChatPage from "./Pages/ChatPage";
import LoginPage from "./Pages/LoginPage";
import { useAuthStore } from "./Store/useStoreAuth";
import PageLoader from "./Components/Pageloader";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth(); // ✅ call it (with parentheses)
  },[]);
 

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white">
        <PageLoader/>
      </div>
    );
  }

  return (
    <>
    <div className="h-screen w-full bg-slate-900 relative flex justify-center items-center p-4 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {/* Routes */}
      <Routes>
        <Route path="/" element={authUser?<ChatPage />:<Navigate to="/login"/>} />
        <Route path="/login" element={authUser?<Navigate to="/"/>:<LoginPage />} />
        <Route path="/signup" element={authUser?<Navigate to="/"/>:<SignupPage />} />
      </Routes>
    
    </div>
     <Toaster position="top-right" />
     </>
  );
};

export default App;
