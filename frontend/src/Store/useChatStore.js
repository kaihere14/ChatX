import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useStoreAuth";

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
      console.log(error);
      const message =
        error?.response?.data?.error || "Failed to fetch messages";
      toast.error(message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: msgData.text,
      image: msgData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Add optimistic message immediately
    set({ messages: [...messages, optimisticMessage] });

    try {
      const { data } = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        msgData
      );

      // Remove optimistic message and add real one
      const updatedMessages = messages.filter((msg) => msg._id !== tempId);
      set({ messages: [...updatedMessages, data] });
    } catch (error) {
      console.log("Error sending message:", error);
      const message =
        error?.response?.data?.message || "Failed to send message";
      toast.error(message);

      // Remove optimistic message on error
      const updatedMessages = messages.filter((msg) => msg._id !== tempId);
      set({ messages: updatedMessages });
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;
    
    const socket = useAuthStore.getState().socket;

    // Remove existing listeners to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId ===selectedUser._id
      if(!isMessageSentFromSelectedUser) return
      const currentMsg = get().messages;
      // Check if message already exists to prevent duplicates
      const messageExists = currentMsg.some(
        (msg) => msg._id === newMessage._id
      );
      if (!messageExists) {
        set({ messages: [...currentMsg, newMessage] });
      }
    });
  },
}));
