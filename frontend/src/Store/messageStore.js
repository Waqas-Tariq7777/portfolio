import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useMessageStore = create((set, get) => ({
  messages: [],
  unreadCount: 0,
  loading: false,

  // Submit Contact Form (Public)
  submitMessage: async (formData, onSuccess) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${baseUrl}/api/v1/message`, formData);
      if (res.status === 201 || res.status === 200) {
        set({ loading: false });
        toast.success("Thank you! Your message has been sent successfully.");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to submit message.");
    }
  },

  // Fetch All Messages (Admin only)
  fetchMessages: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${baseUrl}/api/v1/message`, { withCredentials: true });
      if (res.status === 200) {
        set({ messages: res.data?.data || [], loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load message log.");
    }
  },

  // Fetch Unread Messages Count (Admin only)
  fetchUnreadCount: async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/message/unread-count`, { withCredentials: true });
      if (res.status === 200) {
        set({ unreadCount: res.data?.data?.unreadCount || 0 });
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  // Mark Message as Read (Admin only)
  markAsRead: async (id) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/message/${id}/read`, {}, { withCredentials: true });
      if (res.status === 200) {
        // Update local state list
        const updatedMessages = get().messages.map((msg) =>
          msg._id === id ? { ...msg, isRead: true } : msg
        );
        set({ messages: updatedMessages });
        // Refresh unread count
        get().fetchUnreadCount();
      }
    } catch (error) {
      toast.error("Failed to mark message as read.");
    }
  },

  // Delete Message (Admin only)
  deleteMessage: async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/message/${id}`, { withCredentials: true });
      if (res.status === 200) {
        const remainingMessages = get().messages.filter((msg) => msg._id !== id);
        set({ messages: remainingMessages });
        toast.success("Message deleted successfully.");
        // Refresh unread count
        get().fetchUnreadCount();
      }
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  }
}));
