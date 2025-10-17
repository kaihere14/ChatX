import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useStoreAuth";
import { MessageCircleIcon, UserIcon, MailIcon, LockIcon, LoaderIcon } from "lucide-react";

const SignupPage = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form);
    } catch (err) {
      console.error("Signup failed:", err);
    }
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
          {/* FORM LEFT SIDE */}
          <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center md:border-r border-slate-700/50">
            <div className="w-full max-w-md">
              {/* HEADING */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 mb-4">
                  <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 mb-2">Create Account</h2>
                <p className="text-slate-400">Sign up to get started</p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* FULL NAME */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <MailIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="johndoe@gmail.com"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <LockIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
                  type="submit" 
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <div className="flex items-center justify-center">
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Already have an account? <span className="text-cyan-400 font-semibold">Login</span>
                </Link>
              </div>
            </div>
          </div>

          {/* FORM ILLUSTRATION RIGHT SIDE */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-bl from-cyan-500/5 to-transparent">
            <div className="max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="relative w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-slate-100 mb-2">Start Your Journey Today</h3>
                <p className="text-slate-400 text-sm mb-6">Join thousands of users already on board</p>
                <div className="flex justify-center gap-3">
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Free
                  </span>
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Easy Setup
                  </span>
                  <span className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full text-sm text-cyan-400 font-medium">
                    Private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;