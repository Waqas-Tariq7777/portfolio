import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,

  // Fetch all projects (with optional search and category filters)
  fetchProjects: async (search = "", category = "") => {
    set({ loading: true });
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await axios.get(`${baseUrl}/api/v1/project`, { params });
      if (res.status === 200) {
        set({ projects: res.data?.data || [], loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load projects");
    }
  },

  // Add a new project
  addProject: async (projectData, onSuccess) => {
    set({ loading: true });
    try {
      const headers = projectData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
      const res = await axios.post(`${baseUrl}/api/v1/project`, projectData, {
        headers,
        withCredentials: true
      });
      if (res.status === 201) {
        const newProject = res.data?.data;
        set((state) => ({
          projects: [newProject, ...state.projects],
          loading: false,
        }));
        toast.success("Project added successfully");
        if (onSuccess) onSuccess(newProject);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to add project");
    }
  },

  // Update / Edit project
  updateProject: async (id, updatedData, onSuccess) => {
    set({ loading: true });
    try {
      const headers = updatedData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
      const res = await axios.put(`${baseUrl}/api/v1/project/${id}`, updatedData, {
        headers,
        withCredentials: true
      });
      if (res.status === 200) {
        const updatedProject = res.data?.data;
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj._id === id ? updatedProject : proj
          ),
          loading: false,
        }));
        toast.success("Project updated successfully");
        if (onSuccess) onSuccess(updatedProject);
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update project");
    }
  },

  // Delete a project
  deleteProject: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/project/${id}`, { withCredentials: true });
      if (res.status === 200) {
        set((state) => ({
          projects: state.projects.filter((proj) => proj._id !== id),
          loading: false,
        }));
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  },
}));
