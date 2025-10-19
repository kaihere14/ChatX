import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader, Eye, EyeOff, Key } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../Store/useStoreAuth';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const {getOtp,changePass} = useAuthStore()

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full flex flex-col md:flex-row min-h-[650px] md:min-h-[700px]">
          {/* FORM ILLUSTRATION LEFT SIDE */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-cyan-500/5 to-transparent md:border-r border-slate-700/50">
            <div className="max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                <img
                  src="https://github.com/burakorkmez/chatify/blob/master/frontend/public/login.png?raw=true"
                  alt="Password reset illustration"
                  className="relative w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-slate-100 mb-2">Reset Your Password</h3>
                <p className="text-slate-400 text-sm mb-6">Quick and secure password recovery</p>
                <div className="flex justify-center gap-3">
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Secure
                  </span>
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Fast
                  </span>
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Easy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM RIGHT SIDE */}
          <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* HEADING */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 mb-4">
                  <Key className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 mb-2">Forgot Password?</h2>
                <p className="text-slate-400">
                  {!otpSent 
                    ? "Enter your email to receive OTP" 
                    : "Enter OTP and new password"}
                </p>
              </div>

              {/* FORM */}
              {!otpSent ? (
                <form className="space-y-5">
                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* SEND OTP BUTTON */}
                  <button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
                    type="submit" 
                    onClick={async (e)=>{
                        e.preventDefault();
                        if(!email) { toast.error('Please enter your email'); return; }
                        setIsLoading(true);
                        const ok = await getOtp(email);
                        setIsLoading(false);
                        if(ok){
                          setOtpSent(true);
                          setTimer(120);
                        }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>
              ) : (
                <form className="space-y-5">
                  {/* EMAIL (DISABLED) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-400 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>

                  {/* OTP */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-slate-300">OTP</label>
                      {timer > 0 ? (
                        <span className="text-sm text-cyan-400 font-medium">{formatTime(timer)}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={async ()=>{
                            if(!email) { toast.error('Email is required'); return; }
                            setIsLoading(true);
                            const ok = await getOtp(email);
                            setIsLoading(false);
                            if(ok){
                              setTimer(120);
                            }
                          }}
                          disabled={isLoading}
                          className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Key className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  {/* NEW PASSWORD */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* RESET PASSWORD BUTTON */}
                  <button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
                    type="submit" 
                    onClick={async (e)=>{
                      e.preventDefault();
                      if(!email) { toast.error('Email is required'); return; }
                      if(!otp || otp.length < 4) { toast.error('Please enter a valid OTP'); return; }
                      if(!newPassword) { toast.error('Please enter a new password'); return; }
                      if(newPassword !== confirmPassword) { toast.error('Passwords do not match'); return; }
                      try {
                        setIsLoading(true);
                        const ok = await changePass(email, otp, newPassword);
                        if (ok) {
                          navigate('/login');
                        }
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Remember your password? <span className="text-cyan-400 font-semibold">Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;