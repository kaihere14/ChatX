import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  photoUploading : false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.user });
      toast.success("Account Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: "" });
      toast.success("Logged out Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  },

  updateProfile: async (data) => {
    try {
        set({photoUploading:true})
      const res =  await axiosInstance.post("/auth/update-profile", data);
      set({authUser:res.data})
      toast.success("Photo Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }finally{
        set({photoUploading:false})
    }
  },
}));
