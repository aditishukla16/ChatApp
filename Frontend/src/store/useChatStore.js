import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import API from "../api.js";

export const useChatStore = create((set, get) => ({
  // ---------- Chat related ----------
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // ---------- Contacts related ----------
  contacts: [],
  isContactsLoading: false,

  fetchContacts: async () => {
    const userId = localStorage.getItem("userId"); // Or use AuthStore
    set({ isContactsLoading: true });
    try {
      const { data } = await API.get(`/contacts/${userId}`);
      set({ contacts: data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isContactsLoading: false });
    }
  },

  addContact: async (contactData) => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await API.post("/contacts/add", {
        ...contactData,
        userId,
      });
      set((state) => ({
        contacts: [...state.contacts, data],
      }));
      toast.success("Contact added");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add contact");
    }
  },

  deleteContact: async (contactId) => {
    try {
      await API.delete(`/contacts/${contactId}`);
      set((state) => ({
        contacts: state.contacts.filter((c) => c._id !== contactId),
      }));
      toast.success("Contact deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contact");
    }
  },
}));
