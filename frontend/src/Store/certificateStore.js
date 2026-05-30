import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useCertificateStore = create((set, get) => ({
  certificates: [],
  loading: false,

  // Fetch all certificates
  fetchCertificates: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${baseUrl}/api/v1/certificate`);
      if (res.status === 200) {
        set({ certificates: res.data?.data || [], loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load certificates");
    }
  },

  // Add a new certificate (FormData upload)
  addCertificate: async (formData, onSuccess) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${baseUrl}/api/v1/certificate`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.status === 201) {
        const newCertificate = res.data?.data;
        set((state) => ({
          certificates: [newCertificate, ...state.certificates],
          loading: false,
        }));
        toast.success("Certificate added successfully");
        if (onSuccess) onSuccess(newCertificate);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to add certificate");
    }
  },

  // Update / Edit certificate (FormData upload)
  updateCertificate: async (id, formData, onSuccess) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`${baseUrl}/api/v1/certificate/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.status === 200) {
        const updatedCertificate = res.data?.data;
        set((state) => ({
          certificates: state.certificates.map((cert) =>
            cert._id === id ? updatedCertificate : cert
          ),
          loading: false,
        }));
        toast.success("Certificate updated successfully");
        if (onSuccess) onSuccess(updatedCertificate);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update certificate");
    }
  },

  // Delete certificate
  deleteCertificate: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/certificate/${id}`, { withCredentials: true });
      if (res.status === 200) {
        set((state) => ({
          certificates: state.certificates.filter((cert) => cert._id !== id),
          loading: false,
        }));
        toast.success("Certificate deleted successfully");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to delete certificate");
    }
  },
}));
