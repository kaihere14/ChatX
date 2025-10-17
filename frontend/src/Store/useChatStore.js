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
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) ?? true,

  toggleSound: () => {
    const current = get().isSoundEnabled;
    const next = !current;
    localStorage.setItem("isSoundEnabled", JSON.stringify(next));
    set({ isSoundEnabled: next });
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
      const { data } = await axiosInstance.get("/message/contacts");
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
      const { data } = await axiosInstance.get("/message/chats");
      set({ chats: data });
    } catch (error) {
      const message = error?.response?.data?.error || "Failed to fetch chats";
      toast.error(message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessage: async (id) => {

    try {
      set({ isMessagesLoading: true });
      const { data } = await axiosInstance.get(`/message/${id}`);
      set({ messages: data });
    } catch (error) {
      console.log(error)
      const message =
        error?.response?.data?.error || "Failed to fetch messages";
      toast.error(message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
