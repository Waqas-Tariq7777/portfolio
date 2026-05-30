import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useServicesStore = create((set, get) => ({
  services: [],
  loading: false,

  // Fetch all services
  fetchServices: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${baseUrl}/api/v1/services`);
      if (res.status === 200) {
        set({ services: res.data?.data || [], loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load services");
    }
  },

  // Add a new service
  addService: async (serviceData, onSuccess) => {
    set({ loading: true });
    try {
      const headers = serviceData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
      const res = await axios.post(`${baseUrl}/api/v1/services`, serviceData, {
        headers,
        withCredentials: true
      });
      if (res.status === 201) {
        const newService = res.data?.data;
        set((state) => ({
          services: [newService, ...state.services],
          loading: false,
        }));
        toast.success("Service added successfully");
        if (onSuccess) onSuccess(newService);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to add service");
    }
  },

  // Update / Edit service
  updateService: async (id, updatedData, onSuccess) => {
    set({ loading: true });
    try {
      const headers = updatedData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
      const res = await axios.put(`${baseUrl}/api/v1/services/${id}`, updatedData, {
        headers,
        withCredentials: true
      });
      if (res.status === 200) {
        const updatedService = res.data?.data;
        set((state) => ({
          services: state.services.map((srv) =>
            srv._id === id ? updatedService : srv
          ),
          loading: false,
        }));
        toast.success("Service updated successfully");
        if (onSuccess) onSuccess(updatedService);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update service");
    }
  },

  // Delete a service
  deleteService: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/services/${id}`, { withCredentials: true });
      if (res.status === 200) {
        set((state) => ({
          services: state.services.filter((srv) => srv._id !== id),
          loading: false,
        }));
        toast.success("Service deleted successfully");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  },
}));
