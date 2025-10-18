import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:3300" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  photoUploading: false,
  socket: null,
  onlineUsers: [],

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(baseUrl, {
      withCredentials: true,
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUser", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: async () => {
    if (get().socket.connected) get().socket.disconnect();
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      if(error.response.status === 404) {
        const res2 = await axiosInstance.get("/auth/refresh");
        set({ authUser: res2.data.user });
        get().connectSocket()
      }else{
        toast.error("Unauthorized request");
        set({ isCheckingAuth: false });
      }
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
      get().connectSocket()
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
      get().disconnectSocket()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ photoUploading: true });
      const res = await axiosInstance.post("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Photo Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      set({ photoUploading: false });
    }
  },
}));
