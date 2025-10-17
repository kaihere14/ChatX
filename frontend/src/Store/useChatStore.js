import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContact: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContact: async () => {
    try {
      set({ isUsersLoading: true });
      const { data } = await axiosInstance.post("/message/contacts");
      set({ allContact: data });
    } catch (error) {
      const message =
        error?.response?.data?.error || "Failed to fetch contacts";
      toast.error(message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChat: async () => {
    try {
      set({ isUsersLoading: true });
      const { data } = await axiosInstance.post("/message/chats");
      set({ chats: data });
    } catch (error) {
      const message = error?.response?.data?.error || "Failed to fetch chats";
      toast.error(message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
