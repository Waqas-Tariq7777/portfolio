import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useExperienceStore = create((set, get) => ({
  experiences: [],
  loading: false,

  // Fetch all experiences
  fetchExperiences: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${baseUrl}/api/v1/experience`);
      if (res.status === 200) {
        set({ experiences: res.data?.data || [], loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load experiences");
    }
  },

  // Add a new experience
  addExperience: async (experienceData, onSuccess) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${baseUrl}/api/v1/experience`, experienceData, { withCredentials: true });
      if (res.status === 201) {
        const newExperience = res.data?.data;
        set((state) => ({
          experiences: [newExperience, ...state.experiences],
          loading: false,
        }));
        toast.success("Experience added successfully");
        if (onSuccess) onSuccess(newExperience);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to add experience");
    }
  },

  // Update / Edit experience
  updateExperience: async (id, updatedData, onSuccess) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/experience/${id}`, updatedData, { withCredentials: true });
      if (res.status === 200) {
        const updatedExperience = res.data?.data;
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp._id === id ? updatedExperience : exp
          ),
          loading: false,
        }));
        toast.success("Experience updated successfully");
        if (onSuccess) onSuccess(updatedExperience);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update experience");
    }
  },

  // Delete an experience
  deleteExperience: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/experience/${id}`, { withCredentials: true });
      if (res.status === 200) {
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp._id !== id),
          loading: false,
        }));
        toast.success("Experience deleted successfully");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to delete experience");
    }
  },
}));
